
const Order = require('../models/order.model');
const User = require('../models/user.model');
const RestaurantOrder = require('../models/restaurantorder.model');
const parameterService = require('./parameter.service');
const Cart = require('../models/cart.model');
const sequenceHelper = require('../helpers/sequence.helper');
const orderHelper = require('../helpers/order.helper');
const { default: mongoose } = require('mongoose');
module.exports = {
    checkout,
    getOrders,
    findById,
    update
};

async function getOrders(role,userId, filter, sortBy, sortDirect){
    switch(role){
        case 'admin':
            return getAdminOrders();
        case 'delivery':
            return getDeliveryOrders(userId);
        default:
            return getCustomerOrders(userId, filter, sortBy, sortDirect); 
    }
}
async function getDeliveryOrders(userId){
    return Order.find({deliveryGuy: new mongoose.Types.ObjectId(userId), deliveryDate: {$exists: false}}).sort([['created_at',1]]).populate("client", "firstname lastname phoneNumber")
    .populate(
        {
            path: 'restaurantItems',
            populate: {
                path: 'restaurantId'
            }
        }
    );
}
async function getAdminOrders(){
    let dateMin = new Date();
    dateMin.setHours(0,0,0,0);
    let dateMax = new Date();
    dateMax.setHours(23,59,59,59);
    let pending = await Order.find({preparationDate: {$exists: false}}).select("_id number");
    let ontheway = await Order.find({deliveryGuy: {$exists: true}, deliveryDate:  {$exists: false}}).select("_id number");
    let prepared =await Order.find({preparationDate: {$exists: true}, deliveryGuy:{$exists: false}}).select("_id number");
    let finished = await Order.find({preparationDate: {$exists: true},created_at: {$gte: dateMin , $lte: dateMax }});
    return {
        pending: pending,
        ontheway: ontheway,
        prepared: prepared,
        finished: finished
    };
}
async function getCustomerOrders(id,filter, sortBy, sortDirection){
    let query = orderHelper.getFilterQuery(filter);
    query.client = mongoose.Types.ObjectId(id);
    return Order.find(query).sort([[sortBy, sortDirection]]);
}

async function update(role, userId, body, id){
    switch(role){
        case 'admin':
            return updateAdmin(body, id);
        case 'delivery':
            return updateDelivery(userId, body, id);
        default:
            return;
    }
}

async function updateDelivery(userId,body,id){
    return Order.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id),deliveryGuy:  new  mongoose.Types.ObjectId(userId)},{deliveryDate: new Date()});
}
async function updateAdmin(body,id){
    return Order.findOneAndUpdate({_id:  new  mongoose.Types.ObjectId(id)},{deliveryGuy: body.deliveryGuy});
}
async function findById(role,userId, id){
    switch(role){
        case 'admin':
            return findByIdAdmin(id);
        case 'delivery':
            return findByIdDelivery(userId, id);
        default:
            return findByIdCustomer(userId, id);
    }
}

async function findByIdAdmin(id){
    let result = await Order.findById(id).populate("client", "firstname lastname phoneNumber")
    .populate(
        {
            path: 'restaurantItems',
            populate: {
                path: 'restaurantId'
            }
        }
    );
    if(result.preparationDate&&!result.deliveryGuy){
        let deliveries = await User.find({userType: 'delivery'});
        return {
            order: result,
            deliveries: deliveries
        }
    }
    return result;
}

async function findByIdDelivery(userId, id){
    let order = await Order.find({deliveryGuy:  new mongoose.Types.ObjectId(userId), _id:  new  mongoose.Types.ObjectId(id)})
    .populate("client", "firstname lastname phoneNumber")
    .populate(
        {
            path: 'restaurantItems',
            populate: {
                path: 'restaurantId'
            }
        }
    );
    if(order.length > 0){
        return order[0];
    }
    return {};
}

async function findByIdCustomer(userId, id){
    let order = await Order.find({client:  new  mongoose.Types.ObjectId(userId), _id:  new  mongoose.Types.ObjectId(id)});

    if(order.length > 0){
        return order[0];
    }
    return {};
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