const mongoose = require('mongoose');

const ClubWorkShopsSchema = new mongoose.Schema({
    club_id : String,
    work_id : Array
});

const ClubWorkShopsModel = mongoose.model("clubworkshops",ClubWorkShopsSchema);
module.exports = ClubWorkShopsModel;