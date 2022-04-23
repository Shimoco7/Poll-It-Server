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
*     tags: [PollQuestion Api]
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
*     tags: [PollQuestion Api]
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

module.exports = router