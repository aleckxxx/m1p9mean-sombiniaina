const express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize.helper');
const restaurantorder = require('../services/restaurantorder.service');

module.exports = router;

router.get("/",authorize("restaurant"),getOrders);
router.get("/:id",authorize("restaurant"),getOrderDetail);
router.post("/finish",authorize("restaurant"),finishPreparation)
function getOrders(req,res,next){
    restaurantorder.getOrders(req.user.sub).then((data)=>{
        res.json({status: 200, data: data});
    }).catch((err)=>{
        next(err);
    });
}

function getOrderDetail(req,res,next){
    restaurantorder.getOrderDetail(req.params.id).then((data)=>{
        res.json({status: 200, data: data});
    }).catch((err)=>{
        next(err);
    });
}

function finishPreparation(req,res,next){
    restaurantorder.finishPreparation(req.body.orderId).then((data)=>{
        res.json({status: 200, data: data});
    }).catch((err)=>{
        next(err);
    });
}
