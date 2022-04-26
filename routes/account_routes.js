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

router.post('/logout', authenticate([constants.USER, constants.CLIENT]), Account.logout);
router.get('/logout', authenticate([constants.USER, constants.CLIENT]), Account.getLogout);

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
*  post:
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

router.post('/update', authenticate([constants.USER, constants.CLIENT]), Account.update);

module.exports = router