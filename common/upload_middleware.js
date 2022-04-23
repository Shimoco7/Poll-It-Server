var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
var upload = multer({ storage: storage });


module.exports = upload