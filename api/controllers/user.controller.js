const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const userHelper = require('../helpers/user.helper');
const {validationResult} = require('express-validator');
const validationError = require('../errors/validation.error');
module.exports = router;

router.post("/authenticate", authenticate);

router.post("/register", userHelper.registerUserValidation, register);

router.post("/accountvalidation",accountvalidation);

function authenticate(req,res,next){
    userService.authenticate(req.body)
    .then(user => user ? res.json({status: 200, data: user}) : res.json({status: 400, message: "Email ou mot de passe incorrect"}))
    .catch(err=>next(err));
}

function register(req,res,next){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
    }
    else{
        userService.register(req.body)
        .then(()=> res.json({status: 200, message: "Succès de l'entrée"}))
        .catch((err)=>{
            if(err instanceof validationError){
                res.json({status: 400, data: {errors: err.errors} });
            }
            else{
                next(err);
            }
        });
    }
}

function accountvalidation(req,res,next){
    const token = req.body.token;
    userService.validateRegistration(token).then(()=>{
        res.json({status: 200});
    }).catch((err)=>{
        next(err);
    });
}