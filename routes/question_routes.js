const express = require('express');
const router = express.Router();
const Question = require('../controllers/question_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Question Api
*   description: The Question API
*/

router.post('/create', authenticate, Question.create);

router.get('/create', authenticate, Question.getCreate);

/**
* @swagger
* /question/getAllQuestions:
*   get:
*     summary: get all questions
*     tags: [Question Api]
*     responses:
*       200:
*         description: The questions list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.get('/getAllQuestions', authenticate, Question.getAllQuestions);

module.exports = router