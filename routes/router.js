const express = require('express');
const router = express.Router();
const authenticate = require('../common/auth_middleware');
const upload = require('../common/upload_middleware');
const constants = require('../common/constants');

router.get('/',(req,res)=>{
    res.send("HELLO!");
});

router.post('/upload',authenticate([constants.USER,constants.CLIENT]),upload.single('file'),(req,res)=>{                                                                     
    res.status(200).send({
        url: process.env.SERVER_URL +"/"+req.file.path.replace(/\\/g, "/")
    });
})

router.get('/download/:image',authenticate([constants.CLIENT]),(req,res)=>{
    res.download(constants.STORAGE_PATH+req.params.image);
});                                                               
module.exports = router;                                              