const express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize.helper');
const orderService = require('../services/order.service');
const {validationResult} = require('express-validator');
const orderHelper = require('../helpers/order.helper');
module.exports = router;

router.post("/checkout", authorize("customer"), orderHelper.checkoutValidation, checkout);

router.get("/",authorize("customer"),getOrders);

router.get("/:id",authorize(["customer","admin","delivery"]),findById);

router.put("/:id", authorize(["admin","delivery"]), updateOrder);

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

async function updateOrder(req,res,next){
    orderService.update(req.user.role, req.user.sub, req.body, req.params.id).then(()=>{
        res.json({status: 200});
    }).catch((err)=>{
        next(err);
    })
}

async function findById(req,res,next){
    orderService.findById(req.user.role, req.user.sub, req.params.id).then(()=>{
        res.json({status: 200});
    }).catch((err)=>{
        next(err);
    })
}
async function getOrders(req, res, next){
  const {sortBy = 'created_at', sortDirection = -1, filter = "" } = req.query;
  orderService.getCustomerOrders(req.user.sub,filter,sortBy,sortDirection).then((data)=>{
      res.json({status: 200, data: data});
  }).catch((err)=>{
    next(err);
  });
}