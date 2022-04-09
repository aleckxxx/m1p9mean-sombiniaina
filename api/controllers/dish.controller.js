const express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize.helper');
const dishService = require('../services/dish.service');
const dishHelper = require('../helpers/dish.helper');
const {cloudinaryConfig,uploader, dataUri} = require('../helpers/cloudinary.helper');
const uploadHelper = require('../helpers/upload.helper');
module.exports = router;



router.get("/:id",authorize("restaurant"),getById);


router.post("/",authorize("restaurant"), uploadHelper, cloudinaryConfig,dishHelper.dishValidation,insert);

router.put("/:id",authorize("restaurant"), uploadHelper, cloudinaryConfig,update);

router.delete("/:id",authorize("restaurant"), remove);

const {validationResult} = require('express-validator');

async function getById(req,res,next){
    dishService.getById(req.user.sub,req.params.id).then((data)=>{
        res.json({status: 200, data: data});
    }).catch((err)=>{
      next(err);
    });
}
async function uploadFile(req){
    let content = dataUri(req).content;
    return uploader.upload(content);
}
async function insert(req,res,next){
    
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
        return;
    }
    let serviceCall = ()=>{
        dishService.insert(req.user.sub,req.body).then((response)=>{
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

async function update(req,res,next){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
        return;
    }
    let serviceCall = ()=>{
        dishService.update(req.params.id,req.body).then((response)=>{
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

async function remove(req,res,next){
    dishService.remove(req.user.sub, req.params.id).then((data)=>{
        res.json({status: 200, data: data});
    }).catch((err)=>{
      next(err);
    });
    
}
