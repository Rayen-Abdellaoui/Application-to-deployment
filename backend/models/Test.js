const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    workshop_img : String
});

const TestModel = mongoose.model("test",TestSchema);
module.exports = TestModel;