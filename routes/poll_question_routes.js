const express = require('express');
const router = express.Router();
const PollQuestion = require('../controllers/poll_question_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* tags:
*   name: PollQuestion API
*   description: The PollQuestion API
*/

/**
* @swagger
* /poll_question/create:
*  post:
*     summary: Create a poll question
*     description: "Roles: [Client]"
*     tags: [PollQuestion API]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/PollQuestion'
*     responses:
*       200:
*         description: PollQuestion has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*  get:
*     summary: Create a poll question
*     description: "Roles: [Client]"
*     tags: [PollQuestion API]
*     responses:
*       200:
*         description: PollQuestion has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.post('/create', authenticate([constants.CLIENT]), PollQuestion.create);

router.get('/create', authenticate([constants.CLIENT]), PollQuestion.getCreate);

/**
* @swagger
* /poll_question/getPollQuestionsByPollId/{pollId}:
*   get:
*     summary: get poll questions by poll id
*     description: "Roles: [User]"
*     tags: [PollQuestion API]
*     parameters:
*       - in: path
*         name: pollId
*         schema:
*           type: string
*         required: true
*         description: The poll id
*     responses:
*       200:
*         description: The poll question list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/getPollQuestionsByPollId/:pollId', authenticate([constants.USER]), PollQuestion.getPollQuestionsByPollId);

module.exports = router