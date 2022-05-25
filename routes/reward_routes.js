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
*       500:
*         description:  Internal Server Error
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
*       500:
*         description:  Internal Server Error
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
*       500:
*         description:  Internal Server Error
*/


router.get('/getAllRewards', authenticate([constants.USER, constants.ADMIN]), Reward.getAllRewards);

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
*              image: http://10.10.248.124:8000/storage/images/coffee.jpg
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
*       500:
*         description:  Internal Server Error
*/

router.put('/update', authenticate([constants.ADMIN]), Reward.update);


/**
* @swagger
* /reward/redeemReward:
*  post:
*     summary: Redeem a reward
*     description: "Roles: [User]"
*     tags: [Reward API]
*     requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/Reward'
*            example:
*              accountId: 62601c1c79b1c850871b902f
*              rewardId: 62601c1c79b1c850871b902f
*     responses:
*       200:
*         description: Reward has been redeemed
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


router.post('/redeemReward', authenticate([constants.USER, constants.ADMIN]), Reward.redeemReward);

module.exports = router