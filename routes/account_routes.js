const express = require('express');
const router = express.Router();
const Account = require('../controllers/account_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* tags:
*   name: Account API
*   description: The Account API
*/

/**
* @swagger
* /auth/register:
*  post:
*     summary: Register an account
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Account'
*     responses:
*       200:
*         description: Account has been registered
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
*     summary: Register an account
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     responses:
*       200:
*         description: Register an account
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

router.post('/register', Account.register);
router.get('/register', Account.getRegister);

/**
* @swagger
* /auth/login:
*  post:
*     summary: Login an account
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Account'
*     responses:
*       200:
*         description: Account has been logged in
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
*
*  get:
*     summary: Login an account
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     responses:
*       200:
*         description: Login an account
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

router.post('/login', Account.login);
router.get('/login', Account.getLogin);

/**
* @swagger
* /auth/logout:
*  post:
*     summary: Logout an account
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/Account'
*            example:
*              refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYwMWMxYzc5YjFjODUwODcxYjkwMmYiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY1MDQ2NTgyOH0.wiMhRV3FvL_nTRDGpBOadUI5nM7EEGmyKIOttfLGs6s
*     responses:
*       200:
*         description: Account has been logged out
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
*     summary: Logout an account
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     responses:
*       200:
*         description: Logout an account
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

router.post('/logout', authenticate([constants.USER, constants.CLIENT, constants.ADMIN]), Account.logout);
router.get('/logout', authenticate([constants.USER, constants.CLIENT, constants.ADMIN]), Account.getLogout);

/**
* @swagger
* /auth/refreshToken:
*  post:
*     summary: Generate a new token
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/Account'
*            example:
*              refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYwMWMxYzc5YjFjODUwODcxYjkwMmYiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY1MDQ2NTgyOH0.wiMhRV3FvL_nTRDGpBOadUI5nM7EEGmyKIOttfLGs6s
*     responses:
*       200:
*         description: New token has been generated
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

router.post('/refreshToken', Account.refreshToken);

/**
* @swagger
* /auth/update:
*  put:
*     summary: Update an account
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/Account'
*            example:
*              _id: 62601c1c79b1c850871b902f
*              name: Yossi
*              address: Tel Aviv
*              gender: Male
*              profilePicUrl: https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-1024.png
*              coins: 3
*              rank: 7
*     responses:
*       200:
*         description: Account has been updated
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

router.put('/update', authenticate([constants.USER, constants.CLIENT, constants.ADMIN]), Account.update);


/**
* @swagger
* /auth/updatePassword:
*  put:
*     summary: Update an account password
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#components/schemas/Account'
*            example:
*              _id: 62601c1c79b1c850871b902f
*              oldPassword: Test1234@
*              newPassword: Test1234!
*     responses:
*       200:
*         description: Account password has been updated
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

router.put('/updatePassword', authenticate([constants.USER, constants.CLIENT, constants.ADMIN]), Account.updatePassword);

/**
* @swagger
* /auth/getAccountById/{_id}:
*   get:
*     summary: Get account by id
*     description: "Roles: [Client, User]"
*     tags: [Account API]
*     parameters:
*       - in: path
*         name: _id
*         schema:
*           type: string
*         required: true
*         description: The account id
*     responses:
*       200:
*         description: The account
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

router.get('/getAccountById/:_id', authenticate([constants.USER, constants.CLIENT, constants.ADMIN]), Account.getAccountById);

/**
* @swagger
* /auth/facebook:
*  post:
*     summary: Login an account using facebook
*     description: "Roles: [User, Client]"
*     tags: [Account API]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Account'
*            example:
*               facebookId: 1234567890
*               email: facebook@test.com
*               name: test name
*               profilePicUrl: https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-1024.png
*     responses:
*       200:
*         description: Account has been logged in using facebook
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


router.post('/facebook', Account.facebook);

/**
* @swagger
* /auth/getAccountsCountBySampleGroup:
*   get:
*     summary: Get accounts count by sample group
*     description: "Roles: [Client]"
*     tags: [Account API]
*     parameters:
*        - in: query
*          name: age
*          schema:
*            type: Array
*          example: '["11-20", "21-30", "31-40", "41-50","51-60", "61-70", "71-80", "81-90", "More than 90"]'
*        - in: query
*          name: gender
*          schema:
*            type: Array
*          example: '["Male", "Female", "Dont Wish To Specify"]'
*        - in: query
*          name: educationLevel
*          schema:
*            type: Array
*          example: '["Middle School", "High School", "During Bachelors", "Bachelors or Higher"]'
*        - in: query
*          name: maritalStatus
*          schema:
*            type: Array
*          example: '["Single", "Married", "Widowed", "Divorced", "Separated"]'
*        - in: query
*          name: numberOfChildrens
*          schema:
*            type: Array
*          example: '["0", "1", "2", "3", "4", "5", "More than 5"]'
*        - in: query
*          name: permanentJob
*          schema:
*            type: Array
*          example: '["Yes", "No"]'
*        - in: query
*          name: income
*          schema:
*            type: Array
*          example: '["0-5,000", "5,001-10,000", "10,001-20,000", "20,001-30,000", "More than 30,000"]'
*     responses:
*       200:
*         description: The accounts count
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

router.get('/getAccountsCountBySampleGroup', authenticate([constants.CLIENT, constants.ADMIN]), Account.getAccountsCountBySampleGroup);

module.exports = router