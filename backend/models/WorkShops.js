const mongoose = require('mongoose');

const WorkShopsSchema = new mongoose.Schema({
    club : String,
    title : String,
    date : String,
    salle : Number,
    time : Number,
    lang : String,
    duration : Number,
    participants : { type: Number, default: 0 },
    max_participants : Number ,
    image : { type: String, default: "default_workshop.jpg" },
    trainers : String
});

const WorkShopsModel = mongoose.model("workshops",WorkShopsSchema);
module.exports = WorkShopsModel;