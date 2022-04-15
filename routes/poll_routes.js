const express = require('express')
const router = express.Router()
const Poll = require('../controllers/poll_controller')
const authenticate = require("../common/auth_middleware");

router.post('/create',authenticate, Poll.create);



module.exports = router