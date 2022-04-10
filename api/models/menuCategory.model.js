const { truncate } = require('fs');
const mongoose = require('mongoose');

const menuCategorySchema = new mongoose.Schema({
    restaurantId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    items:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'dishes'
        }
    ]
});

module.exports = mongoose.model('menucategories', menuCategorySchema);