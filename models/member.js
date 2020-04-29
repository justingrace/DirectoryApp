const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    name:String,
    contact:String,
    valid: Boolean,
    image: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Member',memberSchema, 'ibcmembers');
