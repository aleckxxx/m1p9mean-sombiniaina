const express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize.helper');
const menuCategoryService = require('../services/menucategory.service');
const menuCategoryHelper = require('../helpers/menucategory.helper');

module.exports = router;

router.get("/",authorize("restaurant"),getAll);

router.get("/:id",authorize("restaurant"),getById);

router.post("/",authorize("restaurant"),menuCategoryHelper.categoryValidation,insert);

router.put("/:id",authorize("restaurant"),menuCategoryHelper.categoryValidation,update);

router.delete("/:id",authorize("restaurant"), remove);

const {validationResult} = require('express-validator');


async function getAll(req,res,next){
    menuCategoryService.getAll(req.user.sub).then((data)=>{
        console.log(data);
        res.json({status: 200, data: data});
    }).catch((err)=>{
      next(err);
    });
}

async function getById(req,res,next){
    console.log(req.query);
    if(req.query.type === 'detailed'){
        menuCategoryService.getByIdDetailed(req.params.id).then((value)=>{
            res.json({status: 200, data: value});
        }).catch((err)=>{
            next(err);
        })
    }
    else{
        menuCategoryService.getById(req.params.id).then((data)=>{
            res.json({status: 200, data: data});
        }).catch((err)=>{
          next(err);
        });
    }
    
}

async function insert(req,res,next){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
        return;
    }
    menuCategoryService.insert(req.user.sub,req.body).then((response)=>{
        res.json({status: 200,data: response});
    }).catch((err)=>{
        next(err);
    });
}

async function update(req,res,next){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({status: 400, data:{errors: errors.mapped() }});
        return;
    }
    menuCategoryService.update(req.params.id,req.body).then((response)=>{
        res.json({status: 200,data: response});
    }).catch((err)=>{
        next(err);
    });
}

async function remove(req,res,next){
    menuCategoryService.remove(req.user.sub, req.params.id).then((data)=>{
        res.json({status: 200, data: data});
    }).catch((err)=>{
      next(err);
    });
    
}
