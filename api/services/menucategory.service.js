const { default: mongoose } = require('mongoose');
const MenuCategory = require('../models/menuCategory.model');
const User = require("../models/user.model");

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove,
    getByIdDetailed
}
async function getByIdDetailed(id){
    return MenuCategory.findOne({"_id": new mongoose.Types.ObjectId(id)}).populate("items");
}
async function getAll(userId){
    let userConnected = await User.findOne({_id: new mongoose.Types.ObjectId(userId)});
    return MenuCategory.find({restaurantId: userConnected.restaurantId});
}

async function getById(id){
   return MenuCategory.findOne({"_id": new mongoose.Types.ObjectId(id)});
}

async function insert(userId,body){
    let userConnected = await User.findOne({"_id": new mongoose.Types.ObjectId(userId)});
    console.log(userConnected);
    let newMenuCategory = new MenuCategory(body);
    newMenuCategory.restaurantId = userConnected.restaurantId;
    await newMenuCategory.save();
}

async function update(id,body){
  await MenuCategory.findOneAndUpdate({"_id": new mongoose.Types.ObjectId(id)}, body);
}

async function remove(userId,id){
    let userConnected = await User.findOne({_id: new mongoose.Types.ObjectId(userId)});
    await MenuCategory.deleteMany({"_id": new mongoose.Types.ObjectId(id), restaurantId: userConnected.restaurantId});
}