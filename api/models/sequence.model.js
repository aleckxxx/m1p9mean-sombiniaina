const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    sequencePrefix:{
        required: true,
        type: String
    },
    sequenceLength:{
        required: true,
        type: Number
    },
    value:{
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('sequences', sequenceSchema);