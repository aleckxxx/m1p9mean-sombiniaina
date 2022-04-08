const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    created_at:{
        type: Date,
        required: true,
        default: Date.now
    },
    number:{
        type: String,
        required: true
    },
    client:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    deliveryAdress:{
        type: String,
        required: true
    },
    deliveryFee:{
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    restaurantItems:[
        {
            restaurantId:{
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'restaurants'
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
            ]
        }
    ],
    deliveryDate:{
        type: Date,
        required: false
    },
    preparationDate:{
        type: Date,
        required: false
    },
    confirmed:{
        type: Boolean,
        required: true,
        default: false
    },
    deliveryGuy:{
        type: mongoose.Types.ObjectId,
        required: false
    }
});

module.exports = mongoose.model('orders', orderSchema);