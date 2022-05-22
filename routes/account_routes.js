const express = require('express');
const router = express.Router();
const Account = require('../controllers/account_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');
const passport = require('passport');

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
*         description: Token has been generated
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
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
*              profilePicUrl: https://cdn4.iconfinder.com/data/icons/people-avatars-12/24/people_avatar_head_iron_man_marvel_hero-512.png
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
*               profilePicUrl: https://cdn4.iconfinder.com/data/icons/people-avatars-12/24/people_avatar_head_iron_man_marvel_hero-512.png
*     responses:
*       200:
*         description: Account has been login
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/


router.post('/facebook', Account.facebook);

/**
* @swagger
* /auth/getSampleGroupCountByDetails:
*   get:
*     summary: Get sample group count by details
*     description: "Roles: [Client]"
*     tags: [Account API]
*     parameters:
*        - in: query
*          name: age
*          schema:
*            type: Array
*        - in: query
*          name: gender
*          schema:
*            type: Array
*        - in: query
*          name: educationLevel
*          schema:
*            type: Array
*        - in: query
*          name: maritalStatus
*          schema:
*            type: Array
*        - in: query
*          name: numberOfChildrens
*          schema:
*            type: Array
*        - in: query
*          name: permanentJob
*          schema:
*            type: Array
*        - in: query
*          name: income
*          schema:
*            type: Array
*     responses:
*       200:
*         description: The sample group count
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*       404:
*         description:  Not Found
*/

router.get('/getSampleGroupCountByDetails', authenticate([constants.CLIENT, constants.ADMIN]), Account.getSampleGroupCountByDetails);


module.exports = router