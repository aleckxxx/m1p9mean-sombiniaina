const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const restaurantSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    picture:{
        required: true,
        type: String
    },
    adress:{
        required: true,
        type: String
    },
    businessDays:[
        {
           day:{
               required: true,
               type: String
           },
           opening:{
               type: String,
               min: 0,
               max: 24
           },
           closing: {
                type: String,
                min: 0,
                max: 24
           }
        }
    ],
    cuisine:[
        {
            type: String
        }
    ]
});

restaurantSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('restaurants', restaurantSchema);