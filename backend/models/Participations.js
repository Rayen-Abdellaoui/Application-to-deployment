const mongoose = require('mongoose');

const ParticipationsSchema = new mongoose.Schema({
    user_id : String,
    workshop_id : Array
});

const ParticipationsModel = mongoose.model("participations",ParticipationsSchema);
module.exports = ParticipationsModel;