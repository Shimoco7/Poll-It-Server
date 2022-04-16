const express = require('express');
const router = express.Router();
const Answer = require('../controllers/answer_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Answer Api
*   description: The Answer API
*/

router.post('/create', authenticate, Answer.create);
router.get('/create', authenticate, Answer.getCreate);

module.exports = router