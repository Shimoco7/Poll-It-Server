const express = require('express');
const router = express.Router();
const Detail = require('../controllers/detail_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* tags:
*   name: Detail API
*   description: The Detail API
*/

/**
* @swagger
* /detail/create:
*  post:
*     summary: Create a detail
*     tags: [Detail Api]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Detail'
*     responses:
*       200:
*         description: Detail has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.post('/create', authenticate([constants.USER]), Detail.create);

/**
* @swagger
* /detail/getDetailsByAccountId/{accountId}:
*   get:
*     summary: get details by account id
*     tags: [Detail Api]
*     parameters:
*       - in: path
*         name: accountId
*         schema:
*           type: string
*         required: true
*         description: The account id
*     responses:
*       200:
*         description: The details list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/getDetailsByAccountId/:accountId', authenticate([constants.USER, constants.CLIENT]), Detail.getDetailsByAccountId);

module.exports = router