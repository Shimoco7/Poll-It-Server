const express = require('express')
const router = express.Router()
const Detail = require('../controllers/detail_controller')
const authenticate = require("../common/auth_middleware");

router.post('/create', Detail.create);

module.exports = router