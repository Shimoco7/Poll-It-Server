const express = require('express');
const router = express.Router();
const Poll = require('../controllers/poll_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* tags:
*   name: Poll API
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
*       404:
*         description:  Not Found
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
*       404:
*         description:  Not Found
*/

router.post('/create', authenticate([constants.CLIENT]), Poll.create);

router.get('/create', authenticate([constants.CLIENT]), Poll.getCreate);

module.exports = router