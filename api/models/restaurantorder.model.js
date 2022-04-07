const mongoose = require('mongoose');

const restaurantOrderSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    restaurantId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'restaurants'
    },
    client:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    restaurantTotal:{
        type: Number,
        required: true
    },
    items:[
        {
            dish:{
                name:{
                    type: String,
                    required: true
                },
                price:{
                    type: String,
                    required: true
                }
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ],
    confirmed:{
        type:Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('restaurantorders', restaurantOrderSchema);