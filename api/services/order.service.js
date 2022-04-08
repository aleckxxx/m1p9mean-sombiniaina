
const Order = require('../models/order.model');
const dish = require('../models/dish.model');
const RestaurantOrder = require('../models/restaurantorder.model');
const parameterService = require('./parameter.service');
const Cart = require('../models/cart.model');
const sequenceHelper = require('../helpers/sequence.helper');
const orderHelper = require('../helpers/order.helper');
const { default: mongoose } = require('mongoose');
module.exports = {
    checkout,
    getCustomerOrders
};

async function getCustomerOrders(id,filter, sortBy, sortDirection){
    let query = orderHelper.getFilterQuery(filter);
    query.clientId = mongoose.Types.ObjectId(id);
    return Order.find(query,null,).sort([[sortBy, sortDirection]]);
}
async function checkout(data,userId){
    console.log(data);
    let price = await parameterService.getDeliveryPrice();
    let cart = new Cart();
    cart.restaurantItems = data.restaurantItems;
    let cartPopulated = await cart.save().then(async (carts)=>{
        return await Cart.populate(carts,{path:'restaurantItems.items.dish',select: 'name price' }).then((docs)=>{
            return docs;
        });
    });
    let newOrder = new Order();
    newOrder.deliveryAdress = data.adress;
    newOrder.client = userId;
    newOrder.deliveryFee = price;
    newOrder.restaurantItems = [];
    newOrder.number = await sequenceHelper.getSequenceValue('order');
    let restaurantOrders = [];
    let total = price;
    for(let restaurantItem of cartPopulated.restaurantItems){
        let newRestaurantItem = Object.assign({},JSON.parse(JSON.stringify(restaurantItem)));
        let subtotal = 0;
        for(let item of restaurantItem.items){
            subtotal += item.dish.price*item.quantity;
        }
        newRestaurantItem.restaurantTotal = subtotal;
        newOrder.restaurantItems.push(Object.assign({},newRestaurantItem));
        let newRestaurantOrder = new RestaurantOrder(newRestaurantItem);
        newRestaurantOrder.client = userId;
        newRestaurantOrder.orderId = newOrder._id;
        newRestaurantOrder.number = newOrder.number;
        restaurantOrders.push(newRestaurantOrder);
        total += subtotal;
    }
    newOrder.total = total;
    newOrder.confirmed = true;
    console.log(newOrder);
    await newOrder.save();
    RestaurantOrder.insertMany(restaurantOrders);
    return newOrder.save();
}