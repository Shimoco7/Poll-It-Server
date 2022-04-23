const express = require('express');
const router = express.Router();
const DetailQuestion = require('../controllers/detail_question_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');
/**
* @swagger
* tags:
*   name: DetailQuestion API
*   description: The DetailQuestion API
*/

router.post('/create', authenticate(), DetailQuestion.create);

router.get('/create', authenticate(), DetailQuestion.getCreate);

/**
* @swagger
* /detail_question/getAllDetailQuestions:
*   get:
*     summary: Get all detail questions
*     tags: [DetailQuestion Api]
*     responses:
*       200:
*         description: The detail questions list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/getAllDetailQuestions', authenticate([constants.USER]), DetailQuestion.getAllDetailQuestions);

module.exports = router