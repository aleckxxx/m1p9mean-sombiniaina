
const {body} = require('express-validator');


const ValidationError = require('../errors/validation.error');

var categoryValidation = [
   body("name").trim().not().isEmpty().withMessage("Le nom de la catégorie ne doit pas être vide.")
];

module.exports = {
    categoryValidation
}

