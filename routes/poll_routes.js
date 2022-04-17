const express = require('express');
const router = express.Router();
const Poll = require('../controllers/poll_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Poll Api
*   description: The Poll API
*/

/**
* @swagger
* /poll/create:
*  post:
*     summary: Create a poll
*     tags: [Poll Api]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Poll'
*     responses:
*       200:
*         description: Poll has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*  get:
*     summary: Create a poll
*     tags: [Poll Api]
*     responses:
*       200:
*         description: Poll has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.post('/create',authenticate, Poll.create);

router.get('/create', authenticate, Poll.getCreate);

module.exports = router