const {body} = require('express-validator');
var registerRestaurantValidation = [
    body('name').trim().not().isEmpty().withMessage("Le nom ne doit pas etre vide."),
    body('adress').trim().not().isEmpty().withMessage("L'adresse ne doit pas etre vide"),
    body('cuisine').trim().not().isEmpty().withMessage("Le type de cuisine ne doit pas être vide")
    
];

module.exports = {
    getSearchQuery,
    registerRestaurantValidation
};
function getSearchQuery(stringQuery){
    if(!stringQuery || stringQuery === ''){
        return {};
    }
    var query = {
        "$or": [
           {
               name:{
                   $regex: '.*'+stringQuery+".*",
                   $options: "i"
               }
           }
        ]
    }
    return query; 
}