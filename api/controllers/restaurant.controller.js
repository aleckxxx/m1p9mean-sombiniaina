const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const validationError = require('../errors/validation.error');
const restaurantService = require('../services/restaurant.service');
module.exports = router;

router.get("/", searchRestaurant);

async function searchRestaurant(req,res,next){
    let {query='',page=1} = req.query;
    restaurantService.searchRestaurant(query,page).then((response)=>{
        res.json({status: 200, data: response });
    }).catch((err)=>{
        next(err);
    });
}