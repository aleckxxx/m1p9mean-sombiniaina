const { default: mongoose } = require('mongoose');
const User = require("../models/user.model");
const MenuCategory = require("../models/menuCategory.model");
const Dish = require("../models/dish.model");
module.exports = {
    getById,
    insert,
    update,
    remove
}

async function getById(userId,id){
    let userConnected = await User.findOne({"_id": new mongoose.Types.ObjectId(userId)});
    let categories = await MenuCategory.find({restaurantId: userConnected.restaurantId});
    let dish = await Dish.findById(id);
    return {
        dish: dish,
        categories: categories
    }
}

async function insert(userId,body){
    let userConnected = await User.findOne({"_id": new mongoose.Types.ObjectId(userId)});
    let dish = new Dish(body);
    dish.restaurantId = userConnected.restaurantId;
    await dish.save();
    let menu = await MenuCategory.findByIdAndUpdate( dish.categoryId,{$push:{items: dish._id}});
    return dish;
}

async function update(id,body){
  return Dish.findOneAndUpdate({"_id": new mongoose.Types.ObjectId(id)}, body);
}

async function remove(userId,id){
    let userConnected = await User.findOne({_id: new mongoose.Types.ObjectId(userId)});
    await MenuCategory.deleteMany({"_id": new mongoose.Types.ObjectId(id), restaurantId: userConnected.restaurantId});
}