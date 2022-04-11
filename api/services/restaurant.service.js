const Restaurant = require('../models/restaurant.model');
const restaurantHelper = require('../helpers/restaurant.helper');
const mongoose = require('mongoose');
const limit = 9;


module.exports ={
    searchRestaurant,
    getRestaurantById,
    update,
    insert
};
async function update(id,body){
    await Restaurant.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)},body);

}
async function insert(body){
   let resto = new Restaurant(body);
   await resto.save();
}
async function searchRestaurant(stringQuery,page=1){
    const query = restaurantHelper.getSearchQuery(stringQuery);
    const document = await Restaurant.paginate(query,{offset: (limit *(page-1)), limit: limit });
    return {
        restaurants: document.docs,
        totalPages: document.totalPages, 
        page: document.page
    }
}

async function getRestaurantById(type, restaurantId){
    if(type==='nodetail'){
        return Restaurant.findById(restaurantId);
    }
    else{
        return getRestaurantDetail(restaurantId);
    }
}
async function getRestaurantDetail(restaurantId){
    let query = [{
        $match:{
            _id: new mongoose.Types.ObjectId(restaurantId)
        }
    },
    {
        $lookup:{
            from: "menucategories",
            let: {id: "$_id"},
            pipeline:[
                {
                    $match: {
                        $expr:{
                            $eq:["$$id","$restaurantId"]
                        }
                    }
                },
                {
                    $lookup:{
                        from: "dishes",
                        let:{dishes: "$items" },
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $in: ["$_id","$$dishes"]
                                    }
                                }
                            }
                        ],
                        as: "dishes"
                    }
                }
            ],
            as: "categories"
        }
    }
    ];
    return Restaurant.aggregate(query);
}