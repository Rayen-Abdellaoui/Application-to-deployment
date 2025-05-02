const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    email : String,
    phone : {
        type : Number,
        minlength: 8
    },
    password : String,
    profile_img : {
        type : String,
        default : "default_profile_image.png"
    },    role :{
        type : String,
        default : "User"
    }
});

const UsersModel = mongoose.model("users",UserSchema);
module.exports = UsersModel;