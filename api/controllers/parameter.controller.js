const express = require('express');
const authorize = require('../helpers/authorize.helper');
const router = express.Router();
const parameterService = require('../services/parameter.service');
module.exports = router;

router.get("/deliveryfee",getDeliveryFee)

async function getDeliveryFee(req,res,next){
    parameterService.getDeliveryPrice().then((delivery)=>{
        res.json({status: 200, data: delivery  });
    }).catch((err)=>{
        next(err);
    });
}

