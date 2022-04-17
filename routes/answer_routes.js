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

/**
* @swagger
* /answer/create:
*  post:
*     summary: Create an answer
*     tags: [Answer Api]
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
*  get:
*     summary: Create an answer
*     tags: [Answer Api]
*     responses:
*       200:
*         description: Answer has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/


router.post('/create', authenticate, Answer.create);
router.get('/create', authenticate, Answer.getCreate);

module.exports = router