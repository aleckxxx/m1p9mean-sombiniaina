const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phoneNumber:{
        required: true,
        type: String
    },
    encryptedPassword:{
        required: true,
        type: String
    },
    userType:{
        required: true,
        type: String,
        default: "customer"
    },
    confirmationToken:{
        required: false,
        type: String
    },
    active:{
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('users', userSchema)