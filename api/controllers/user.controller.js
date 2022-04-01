const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');


router.post("/authenticate", authenticate);
module.exports = router;

function authenticate(req,res,next){
    userService.authenticate(req.body)
    .then(user => user ? res.json({status: 200, data: user}) : res.json({status: 400, message: "Email ou mot de passe incorrect"}))
    .catch(err=>next(err));
}

