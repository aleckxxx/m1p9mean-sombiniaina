let { config, uploader }= require('cloudinary');
let path=require('path');
const dUri = require('datauri/parser');
const cloudinaryConfig = (req,res,next) => {
    config({
        cloud_name: "dd0opm8h9",
        api_key: "736466139188539",
        api_secret: "T85DYDNvPaqn2li3f6NhworzE5I",
    });
    next();
}

const dataUri = req => new dUri().format(path.extname(req.file.originalname).toString(), req.file.buffer);
module.exports= { cloudinaryConfig, uploader,dataUri };