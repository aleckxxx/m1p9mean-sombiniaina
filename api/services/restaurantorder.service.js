const { default: mongoose } = require('mongoose');
const RestaurantOrder = require('../models/restaurantorder.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const { jitOnlyGuardedExpression } = require('@angular/compiler/src/render3/util');

module.exports = {
    getOrders,
    getOrderDetail,
    finishPreparation
};
async function getOrders(userId){
    let dateMin = new Date();
    dateMin.setHours(0,0,0,0);
    let dateMax = new Date();
    dateMax.setHours(23,59,59,59);
    let user = await User.findOne({_id: new mongoose.Types.ObjectId(userId)});
    let pendingOrders = await RestaurantOrder.find(
        {
            restaurantId: user.restaurantId,
            preparationDate:{$exists: false},
        }).select("_id number").sort([['created_at',1]]);
    let finishedOrders = await RestaurantOrder.find({
        restaurantId: user.restaurantId,
        preparationDate:{$exists: true, $gte: dateMin, $lte: dateMax }
    }).select("_id number").sort([['created_at',1]]);
    return {
        pending: pendingOrders,
        finished: finishedOrders
    }
}

async function getOrderDetail(orderId){
    let order = await RestaurantOrder.findOne({_id: new mongoose.Types.ObjectId(orderId)}).populate('client',"firstname lastname phonenumber");
    return order;
}

async function finishPreparation(objectId){
   let restOrder = await RestaurantOrder.findOneAndUpdate({_id: new mongoose.Types.ObjectId(objectId), preparationDate:{$exists: false}},{preparationDate: new Date() });
   if(restOrder){
           finishOrder(restOrder);
    }
}

async function finishOrder(restOrder){
    let order =  await Order.findOneAndUpdate({_id: restOrder.orderId },{$inc:{preparationFinished: 1}},{new: true});
    if(order.preparationFinished>=order.restaurantItems.length){
        order.preparationDate = new Date();
        await order.save();
    }
}