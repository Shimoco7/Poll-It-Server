const express = require('express');
const router = express.Router();
const Answer = require('../controllers/answer_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* tags:
*   name: Answer API
*   description: The Answer API
*/

/**
* @swagger
* /answer/create:
*  post:
*     summary: Create an answer
*     description: "Roles: [User]"
*     tags: [Answer API]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Answer'
*     responses:
*       200:
*         description: Answer has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*  get:
*     summary: Create an answer
*     description: "Roles: [User]"
*     tags: [Answer API]
*     responses:
*       200:
*         description: Create an answer
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/


router.post('/create', authenticate([constants.USER, constants.ADMIN]), Answer.create);
router.get('/create', authenticate([constants.USER, constants.ADMIN]), Answer.getCreate);

/**
* @swagger
* /answer/getAnswerById/{_id}:
*   get:
*     summary: Get answer by id
*     description: "Roles: [Client]"
*     tags: [Answer API]
*     parameters:
*       - in: path
*         name: _id
*         schema:
*           type: string
*         required: true
*         description: The answer id
*     responses:
*       200:
*         description: The answer
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/getAnswerById/:_id', authenticate([constants.CLIENT, constants.ADMIN]), Answer.getAnswerById);

/**
* @swagger
* /answer/getAnswersByPollId/{pollId}:
*   get:
*     summary: Get answers by poll id
*     description: "Roles: [Client]"
*     tags: [Answer API]
*     parameters:
*       - in: path
*         name: pollId
*         schema:
*           type: string
*         required: true
*         description: The poll id
*     responses:
*       200:
*         description: The answers list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/getAnswersByPollId/:pollId', authenticate([constants.CLIENT, constants.ADMIN]), Answer.getAnswersByPollId);

/**
* @swagger
* /answer/getAnswersByPollQuestionId/{pollQuestionId}:
*   get:
*     summary: Get answers by poll question id
*     description: "Roles: [Client]"
*     tags: [Answer API]
*     parameters:
*       - in: path
*         name: pollQuestionId
*         schema:
*           type: string
*         required: true
*         description: The pollQuestion id
*     responses:
*       200:
*         description: The answers list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/getAnswersByPollQuestionId/:pollQuestionId', authenticate([constants.CLIENT, constants.ADMIN]), Answer.getAnswersByPollQuestionId);

module.exports = router