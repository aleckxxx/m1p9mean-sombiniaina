const express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize.helper');
const orderService = require('../services/order.service');
module.exports = router;

router.post("/checkout", authorize("customer"), checkout );

async function checkout(req,res,next){
    console.log("check out entered");
    orderService.checkout(req.body, req.user.sub).then((response)=>{
        res.json({status: 200,data: response});
    }).catch((err)=>{
        next(err);
    });
}