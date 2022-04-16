const express = require('express');
const router = express.Router();
const Poll = require('../controllers/poll_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Poll Api
*   description: The Poll API
*/


router.post('/create',authenticate, Poll.create);

router.get('/create', authenticate, Poll.getCreate);

module.exports = router