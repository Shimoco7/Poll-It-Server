const express = require('express');
const router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })
  
  var upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    res.send("HELLO!");
});

router.post('/upload',upload.single('file'),(req,res)=>{
    res.status(200).send({
        url: process.env.SERVER_URL +"/"+req.file.path.replace(/\\/g, "/")
    });
})

module.exports = router;