
const {body} = require('express-validator');


const ValidationError = require('../errors/validation.error');

var dishValidation = [
   body("name").trim().not().isEmpty().withMessage("Le nom du plat ne doit pas être vide."),
   body("description").trim().not().isEmpty().withMessage("La description ne doit pas être vide.").isLength({min:1,max:75}).withMessage("Ne doit pas depasser 75 caractères"),
   body("price").trim().not().isEmpty().withMessage("Le prix ne doit pas être vide.").isInt().withMessage("Le prix doit être un chiffre"),
   body("makingPrice").trim().not().isEmpty().withMessage("Le prix de revient ne doit pas être vide.").isInt().withMessage("Le prix de revient doit être un chiffre"),
   body("active").not().isEmpty().withMessage("L'état ne doit pas être vide"),
   body("categoryId").not().isEmpty().withMessage("La catégorie ne doit pas être vide.")
];

module.exports = {
    dishValidation
}

