const {body} = require('express-validator');
const User = require('../models/user.model');

const ValidationError = require('../errors/validation.error');

var registerUserValidation = [
    body('email').trim().not().isEmpty().withMessage("L'email ne doit pas être vide.").isEmail().withMessage("L'email doit être de la forme rasoa@example.com."),
    body('firstname').trim().not().isEmpty().withMessage("Les prénoms ne doivent pas être vide."),
    body('lastname','Le nom ne doit pas être vide.').trim().not().isEmpty(),
    body('phonenumber').trim().not().isEmpty().withMessage("Le numéro de telephone ne doit pas être vide.")
    .isNumeric().isLength({min:9,max:9}).withMessage("Le numéro de télephone doit être de la forme +261 XX XX XXX XX"),
    body('password').trim().not().isEmpty().withMessage("Le mot de passe ne doit pas être vide.").isLength({min: 8}).withMessage("Le mot de passe doit être composé d'au moins 8 charactères")
];

module.exports = {
    registerUserValidation,
    seeIfUserAlreadyRegistered
}

async function seeIfUserAlreadyRegistered(user){
    const existingUser = await User.findOne({$or:[{email: user.email},{phoneNumber: user.phonenumber}]});
    if(existingUser){
        let message = "Le numéro de télephone est déjà utilisé par un utilisateur existant.";
        let field = "phonenumber";
        if(existingUser.email === user.email){
            message = "L'email est déjà utilisé par un utilisateur existant.";
            field = "email";
        }
        let error = new ValidationError();
        error.errors[field] = {msg: message};
        throw error;
    }
}

