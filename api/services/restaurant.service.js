const Restaurant = require('../models/restaurant.model');
const restaurantHelper = require('../helpers/restaurant.helper');
const limit = 9;

module.exports ={
    searchRestaurant
};

async function searchRestaurant(stringQuery,page=1){
    const query = restaurantHelper.getSearchQuery(stringQuery);
    const document = await Restaurant.paginate(query,{offset: (limit *(page-1)), limit: limit });
    return {
        restaurants: document.docs,
        totalPages: document.totalPages, 
        page: document.page
    }
}
