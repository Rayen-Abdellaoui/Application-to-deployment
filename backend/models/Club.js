const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
    club_name : String,
    club_img : String,
    email : String,
    password : String,
    role :{
        type : String,
        default : "Club"
    }
});

const ClubModel = mongoose.model("clubs",ClubSchema);
module.exports = ClubModel;