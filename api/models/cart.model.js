const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    restaurantItems:[
        {
            restaurantId:{
                type: mongoose.Types.ObjectId,
                ref: 'restaurants',
                required: true
            },
            items:[
                {
                    dish: {
                        type: mongoose.Types.ObjectId,
                        ref: 'dishes',
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('carts', cartSchema);