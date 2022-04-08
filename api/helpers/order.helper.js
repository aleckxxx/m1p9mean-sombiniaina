const {body} = require('express-validator');



const checkoutValidation = [
    body('adress').trim().not().isEmpty().withMessage("L'adresse ne doit pas être vide.")
];
module.exports = {
    checkoutValidation,
    getFilterQuery
}

function getFilterQuery(filter){
    let query= {
        $or:[]
    };
    if(filter==="finished"){
        query.$or.push({deliveryDate: {$exists: true} });
    }
    if(filter==="on_the_way"){
        query.$or.push({preparationDate: {$exists: true} });
    }
    if(filter==="pending"){
        query.$or.push({$and:[{deliveryDate:{$exists: false}},{preparationDate:{$exists: false}}]});
    }
    if(query.$or.length === 0) return {};
    return query;
}