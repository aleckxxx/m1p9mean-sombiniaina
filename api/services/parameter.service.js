const Parameter = require('../models/parameter.model');

module.exports = {
    getDeliveryPrice,
    getCuisineTypes
};

async function getCuisineTypes(){
    let parameterObject = await Parameter.findOne({name: 'cuisines'});
    if(parameterObject.values){
        return parameterObject.values;
    }
    else{
        return [];
    }
}
async function getDeliveryPrice(){
    let parameterObject = await Parameter.findOne({name: 'delivery_price'});
    if(parameterObject.price){
        return parameterObject.price;
    }
    else{
        return 0;
    }
}

async function getParameter(name){
    switch(name){
        case 'deliveryfee':
            return getDeliveryPrice();
        default:
            return {};
    }
}