const {body} = require('express-validator');



const checkoutValidation = [
    body('adress').trim().not().isEmpty().withMessage("L'adresse ne doit pas être vide.")
];
module.exports = {
    checkoutValidation
}