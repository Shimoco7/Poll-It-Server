const express = require('express');
const router = express.Router();
const Detail = require('../controllers/detail_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Detail Api
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
*/

router.post('/create', authenticate, Detail.create);

/**
* @swagger
* /detail/getDetailsByUid:
*   get:
*     summary: get details by user id
*     tags: [Detail Api]
*     responses:
*       200:
*         description: The details list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.get('/getDetailsByUid', authenticate, Detail.getDetailsByUid);

module.exports = router