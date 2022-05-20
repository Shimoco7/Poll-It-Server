const express = require('express');
const router = express.Router();
const Reward = require('../controllers/reward_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* tags:
*   name: Reward API
*   description: The Reward API
*/

/**
* @swagger
* /reward/create:
*  post:
*     summary: Create a reward
*     description: "Roles: [Admin]"
*     tags: [Reward API]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Reward'
*     responses:
*       200:
*         description: Reward has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*  get:
*     summary: Create a reward
*     description: "Roles: [Admin]"
*     tags: [Reward API]
*     responses:
*       200:
*         description: Reward has been created
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.post('/create', authenticate([constants.ADMIN]), Reward.create);

router.get('/create', authenticate([constants.ADMIN]), Reward.getCreate);

/**
* @swagger
* /reward/getAllRewards:
*   get:
*     summary: Get all rewards
*     description: "Roles: [User]"
*     tags: [Reward API]
*     responses:
*       200:
*         description: The rewards list
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/


router.get('/getAllRewards', authenticate([constants.USER]), Reward.getAllRewards);

/**
* @swagger
* /reward/update:
*  put:
*     summary: Update a reward
*     description: "Roles: [Admin]"
*     tags: [Reward API]
*     requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/Reward'
*            example:
*              _id: 62601c1c79b1c850871b902f
*              title: Coffee
*              description: Starbucks hot coffee
*              price: 5
*     responses:
*       200:
*         description: Reward has been updated
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.put('/update', authenticate([constants.ADMIN]), Reward.update);


module.exports = router