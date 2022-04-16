const express = require('express');
const router = express.Router();
const PollQuestion = require('../controllers/poll_question_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Poll Question Api
*   description: The Poll Question API
*/

router.post('/create',authenticate, PollQuestion.create);

router.get('/create', authenticate, PollQuestion.getCreate);

module.exports = router