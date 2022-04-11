const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const validationError = require('../errors/validation.error');
const authorize = require('../helpers/authorize.helper');
const {cloudinaryConfig,uploader, dataUri} = require('../helpers/cloudinary.helper');
const uploadHelper = require('../helpers/upload.helper');
const restaurantService = require('../services/restaurant.service');
const restaurantHelper = require('../helpers/restaurant.helper');
module.exports = router;

router.get("/", searchRestaurant);

router.get("/:id", getRestaurantById);

router.post("/",authorize("admin"), uploadHelper, cloudinaryConfig, restaurantHelper.registerRestaurantValidation,  insert);

router.put("/:id",authorize("admin"), uploadHelper, cloudinaryConfig, update);

async function searchRestaurant(req,res,next){
    let {query='',page=1} = req.query;
    restaurantService.searchRestaurant(query,page).then((response)=>{
        res.json({status: 200, data: response });
    }).catch((err)=>{
        next(err);
    });
}

async function uploadFile(req){
    let content = dataUri(req).content;
    return uploader.upload(content);
}

async function update(req,res,next){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
        return;
    }
    let serviceCall = ()=>{
        restaurantService.update(req.params.id,req.body).then((response)=>{
            res.json({status: 200,data: response});
        }).catch((err)=>{
            next(err);
        });
    };
    console.log(req.file);
    if(req.file){
       uploadFile(req).then((result)=>{
          req.body.picture = result.url;
          serviceCall();
       }).catch((err)=>{
           console.log(err);
           serviceCall();
       })
    }
    else{
        serviceCall();
    }
   
}

async function insert(req,res,next){
    
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
        return;
    }
    let serviceCall = ()=>{
        console.log(req.body.name);
        restaurantService.insert(req.body).then((response)=>{
            res.json({status: 200,data: response});
        }).catch((err)=>{
            next(err);
        });
    };
    if(req.file){
       uploadFile(req).then((result)=>{
          req.body.picture = result.url;
          serviceCall();
       }).catch((err)=>{
           console.log(err);
           serviceCall();
       })
    }
    else{
        serviceCall();
    }
    
}


async function getRestaurantById(req,res,next){
    let restaurantId = req.params.id;
    restaurantService.getRestaurantById(req.query.type,restaurantId).then((detail)=>{
        if(detail[0]){
            res.json({status: 200, data: detail[0]});
        }
        else{
            res.json({status: 200, data: detail});
        }
    }).catch((err=>{
        next(err);
    }));
}