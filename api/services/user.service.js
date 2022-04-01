const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = require('../helpers/secret.helper');

module.exports = {
    authenticate
};

async function authenticate(user){
    var password = crypto.createHash('md5').update(user.password).digest('hex');
    const registered = await User.findOne({email: user.email.toLowerCase(), encryptedPassword: password}).select("-encryptedPassword");
    console.log(registered);
    if(registered){
        const token = jwt.sign({sub: registered._id, role: registered.userType}, secret);
        return {
            userInfo:registered, 
            token: token
        }
    }
}
