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
*     description: "Roles: [Client]"
*     tags: [Poll API]
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
*     description: "Roles: [Client]"
*     tags: [Poll API]
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

/**
* @swagger
* /poll/getAllPolls:
*   get:
*     summary: Get all polls
*     description: "Roles: [User]"
*     tags: [Poll API]
*     responses:
*       200:
*         description: The polls list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/


router.get('/getAllPolls', authenticate([constants.USER]), Poll.getAllPolls);

/**
* @swagger
* /poll/getPollsByClientId/{accountId}:
*   get:
*     summary: get polls by clientId
*     description: "Roles: [Client]"
*     tags: [Poll API]
*     parameters:
*       - in: path
*         name: accountId
*         schema:
*           type: string
*         required: true
*         description: The polls list
*     responses:
*       200:
*         description: The polls list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/


router.get('/getPollsByClientId/:accountId', authenticate([constants.CLIENT]), Poll.getPollsByClientId);


/**
* @swagger
* /poll/getPollsByUserId/{accountId}:
*   get:
*     summary: get polls by userId
*     description: "Roles: [User]"
*     tags: [Poll API]
*     parameters:
*       - in: path
*         name: accountId
*         schema:
*           type: string
*         required: true
*         description: The polls list
*     responses:
*       200:
*         description: The polls list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/


router.get('/getPollsByUserId/:accountId', authenticate([constants.USER]), Poll.getPollsByUserId);

/**
* @swagger
* /poll/update:
*  post:
*     summary: Update a poll
*     description: "Roles: [Client]"
*     tags: [Poll API]
*     requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/Poll'
*            example:
*              _id: 62601c1c79b1c850871b902f
*              gender: ['Male']
*              minAge: '20'
*              maxAge: '30'
*     responses:
*       200:
*         description: Poll has been updated
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.post('/update', authenticate([constants.CLIENT]), Poll.update);


module.exports = router