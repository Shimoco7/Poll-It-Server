var multer = require('multer');
const constants = require('../common/constants');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, constants.STORAGE_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });


module.exports = upload