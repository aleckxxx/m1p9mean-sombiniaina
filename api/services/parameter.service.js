const Parameter = require('../models/parameter.model');

module.exports = {
    getDeliveryPrice
};
async function getDeliveryPrice(){
    let parameterObject = await Parameter.findOne({name: 'delivery_price'});
    if(parameterObject.price){
        return parameterObject.price;
    }
    else{
        return 0;
    }
}
