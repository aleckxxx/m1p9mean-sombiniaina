const mongoose = require('mongoose');

const restaurantOrderSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    created_at:{
        type:Date,
        required: true,
        default: Date.now
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
    number:{
        required: true,
        type: String
    },
    restaurantTotal:{
        type: Number,
        required: true
    },
    preparationDate:{
        type: Date,
        required: false
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
        default: true
    }
});

module.exports = mongoose.model('restaurantorders', restaurantOrderSchema);