const amqp = require('amqplib');
const mongoose = require('mongoose');
const ParticipationsModel = require('./models/Participations');
const WorkShopsModel = require('./models/WorkShops');

async function publishToQueue(queueName, message) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log("Message sent to queue:", queueName);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Error in publishing to queue:", error);
    }
}

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('subscriptionQueue', { durable: true });
        return { connection, channel };
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
        throw error;
    }
}

async function consumeFromQueue(channel) {
    channel.consume('subscriptionQueue', async (msg) => {
        if (msg !== null) {
            const { user_id, workshop_id } = JSON.parse(msg.content.toString());
            console.log("Processing message:", { user_id, workshop_id });

            try {
                const participations = await ParticipationsModel.findOne({ user_id });
                const workshop = await WorkShopsModel.findById(workshop_id);

                if (!workshop) {
                    console.log('Workshop not found');
                    channel.ack(msg);
                    return;
                }

                if (participations) {
                    if (participations.workshop_id.indexOf(workshop_id) === -1) {
                        if (workshop.participants >= workshop.max_participants) {
                            console.log("Can't add new Participants");
                        } else {
                            const p = workshop.participants + 1;
                            await WorkShopsModel.updateOne({ _id: workshop_id }, { $set: { participants: p } });
                            await ParticipationsModel.updateOne({ _id: participations._id }, { $set: { workshop_id: [...participations.workshop_id, workshop_id] } });
                            console.log(`Participants Updated in workshop with id ${workshop.id}`);
                        }
                    } else {
                        const p = workshop.participants - 1;
                        await WorkShopsModel.updateOne({ _id: workshop_id }, { $set: { participants: p } });
                        await ParticipationsModel.updateOne({ _id: participations._id }, { $set: { workshop_id: participations.workshop_id.filter(el => el !== workshop_id) } });
                        console.log(`Participants cancelled for workshop with id ${workshop.id}`);
                    }
                } else {
                    await ParticipationsModel.create({ user_id, workshop_id: workshop_id });
                    const p = workshop.participants + 1;
                    await WorkShopsModel.updateOne({ _id: workshop_id }, { $set: { participants: p } });
                    console.log(`Participants Updated in workshop with id ${workshop.id}`);
                }
                channel.ack(msg);
            } catch (error) {
                console.error("Error processing message:", error);
                channel.nack(msg);
            }
        }
    }, { noAck: false });
}

module.exports = { connectToRabbitMQ, consumeFromQueue,publishToQueue };
