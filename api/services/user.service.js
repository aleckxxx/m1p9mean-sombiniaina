const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = require('../helpers/secret.helper');
const userHelper = require('../helpers/user.helper');
const mailHelper = require('../helpers/mail.helper');
const config = require('../helpers/config.helper');
module.exports = {
    authenticate,
    register,
    validateRegistration
};

async function authenticate(user){
    const password = crypto.createHash('md5').update(user.password).digest('hex');
    const registered = await User.findOne({email: user.email.toLowerCase(), encryptedPassword: password}).select("-encryptedPassword");
    if(registered){
        const token = jwt.sign({sub: registered._id, role: registered.userType}, secret);
        return {
            userInfo:registered, 
            token: token
        }
    }
}

async function register(user){
    const cryptedPassword = crypto.createHash('md5').update(user.password).digest('hex');
    await userHelper.seeIfUserAlreadyRegistered(user);
    const validationToken = crypto.createHash('md5').update(new Date().toISOString()+"validationT0ken").digest('hex');
    const newUser = new User();
    newUser.firstname = user.firstname;
    newUser.lastname = user.lastname;
    newUser.encryptedPassword = cryptedPassword;
    newUser.email = user.email;
    newUser.confirmationToken = validationToken;
    newUser.phoneNumber = user.phonenumber;
    newUser.save();
    mailHelper.sendMail(newUser.email,"Confirmez votre identité",`Bonjour,\n Un compte e-kaly a été créé avec votre email. Pour valider l'inscription, Veuillez cliquer sur le lien ${config.validationBaseUrl}${validationToken}`);
}

async function validateRegistration(token){
    var user = await User.findOne({confirmationToken: token});
    if(user){
        user.active =true;
        await user.save();
    }
    else{
        throw new Error("Non autorisé!");
    }
}