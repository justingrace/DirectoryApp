const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    name:{type:String, required: true},
    phone:String,
    email: String,
    valid: Boolean,
    birthday: String,
    image: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Member',memberSchema, 'ibcmembers');
