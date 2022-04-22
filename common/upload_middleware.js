var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg')
    }
})
  
var upload = multer({ storage: storage });


module.exports = upload