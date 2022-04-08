const express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize.helper');
const orderService = require('../services/order.service');
const {validationResult} = require('express-validator');
const orderHelper = require('../helpers/order.helper');
module.exports = router;

router.post("/checkout", authorize("customer"), orderHelper.checkoutValidation, checkout);

async function checkout(req,res,next){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
        return;
    }
    orderService.checkout(req.body, req.user.sub).then((response)=>{
        res.json({status: 200,data: response});
    }).catch((err)=>{
        next(err);
    });
}