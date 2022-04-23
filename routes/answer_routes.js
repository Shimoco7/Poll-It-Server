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
*     tags: [Answer API]
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
*/


router.post('/create', authenticate([constants.USER]), Answer.create);
router.get('/create', authenticate([constants.USER]), Answer.getCreate);

module.exports = router