const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    }
},{strict: false});

module.exports = mongoose.model('parameters', parameterSchema);