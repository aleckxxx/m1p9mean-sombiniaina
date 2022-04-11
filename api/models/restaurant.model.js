const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const restaurantSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    picture:{
        required: false,
        type: String
    },
    adress:{
        required: true,
        type: String
    },
    cuisine:{
        required: true,
        type: String
    }
});

restaurantSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('restaurants', restaurantSchema);