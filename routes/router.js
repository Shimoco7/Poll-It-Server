const express = require('express');
const router = express.Router();
var multer = require('multer');
const authenticate = require('../common/auth_middleware');
const constants = require('../common/constants');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg')
    }
  })
  
  var upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    res.send("HELLO!");
});

router.post('/upload',authenticate([constants.USER,constants.CLIENT]),upload.single('file'),(req,res)=>{
    res.status(200).send({
        url: process.env.SERVER_URL +"/"+req.file.path.replace(/\\/g, "/")
    });
})

module.exports = router;