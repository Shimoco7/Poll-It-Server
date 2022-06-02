const express = require('express');
const router = express.Router();
const Order = require('../controllers/order_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* /order/getOrderById/{_id}:
*   get:
*     summary: Get order by id
*     description: "Roles: [User]"
*     tags: [Order API]
*     parameters:
*       - in: path
*         name: _id
*         schema:
*           type: string
*         required: true
*         description: The order id
*     responses:
*       200:
*         description: The order
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*       500:
*         description:  Internal Server Error
*/

router.get('/getOrderById/:_id', authenticate([constants.USER, constants.ADMIN]), Order.getOrderById);


/**
* @swagger
* /order/getOrdersByAccountId/{accountId}:
*   get:
*     summary: Get orders by account id
*     description: "Roles: [User]"
*     tags: [Order API]
*     parameters:
*       - in: path
*         name: accountId
*         schema:
*           type: string
*         required: true
*         description: The account id
*     responses:
*       200:
*         description: The orders list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*       500:
*         description:  Internal Server Error
*/


router.get('/getOrdersByAccountId/:accountId', authenticate([constants.USER, constants.ADMIN]), Order.getOrdersByAccountId);

module.exports = router