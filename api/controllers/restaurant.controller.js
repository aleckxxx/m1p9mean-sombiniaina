const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const validationError = require('../errors/validation.error');
const restaurantService = require('../services/restaurant.service');
module.exports = router;

router.get("/", searchRestaurant);

router.get("/:id",getRestaurantDetail);

async function searchRestaurant(req,res,next){
    let {query='',page=1} = req.query;
    restaurantService.searchRestaurant(query,page).then((response)=>{
        res.json({status: 200, data: response });
    }).catch((err)=>{
        next(err);
    });
}

async function getRestaurantDetail(req,res,next){
    let restaurantId = req.params.id;
    restaurantService.getRestaurantDetail(restaurantId).then((detail)=>{
        res.json({status: 200, data: detail[0]});
    }).catch((err=>{
        next(err);
    }));
}