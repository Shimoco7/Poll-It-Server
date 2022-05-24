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

/**
* @swagger
* /detail_question/create:
*  post:
*     summary: Create a detail question
*     description: "Roles: [Admin]"
*     tags: [DetailQuestion API]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/DetailQuestion'
*     responses:
*       200:
*         description: DetailQuestion has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*  get:
*     summary: Create a detail question
*     description: "Roles: [Admin]"
*     tags: [DetailQuestion API]
*     responses:
*       200:
*         description: Create a detail question
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.post('/create', authenticate([constants.ADMIN]), DetailQuestion.create);

router.get('/create', authenticate([constants.ADMIN]), DetailQuestion.getCreate);

/**
* @swagger
* /detail_question/getAllDetailQuestions:
*   get:
*     summary: Get all detail questions
*     description: "Roles: [User]"
*     tags: [DetailQuestion API]
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

router.get('/getAllDetailQuestions', authenticate([constants.USER, constants.ADMIN]), DetailQuestion.getAllDetailQuestions);

module.exports = router