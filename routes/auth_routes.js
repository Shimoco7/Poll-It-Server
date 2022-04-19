const express = require('express');
const router = express.Router();
const Account = require('../controllers/account_controller');
const authenticate = require("../common/auth_middleware");
const constants = require('../common/constants');

/**
* @swagger
* tags:
*   name: Account Api
*   description: The Account API
*/

/**
* @swagger
* /auth/register:
*  post:
*     summary: Register an account
*     tags: [Account Api]
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
*  get:
*     summary: Register an account
*     tags: [Account Api]
*     responses:
*       200:
*         description: Register an account
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.post('/register', Account.register);
router.get('/register', Account.getRegister);

/**
* @swagger
* /auth/login:
*  post:
*     summary: Login an account
*     tags: [Account Api]
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
*  get:
*     summary: Login an account
*     tags: [Account Api]
*     responses:
*       200:
*         description: Login an account
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.post('/login', Account.login);
router.get('/login', Account.getLogin);

/**
* @swagger
* /auth/logout:
*  post:
*     summary: Logout an account
*     tags: [Account Api]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Account'
*     responses:
*       200:
*         description: Account has been logged out
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*  get:
*     summary: Logout an account
*     tags: [Account Api]
*     responses:
*       200:
*         description: Logout an account
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.post('/logout', authenticate([constants.USER, constants.CLIENT]), Account.logout);
router.get('/logout', authenticate([constants.USER, constants.CLIENT]), Account.getLogout);

/**
* @swagger
* /auth/refreshToken:
*  post:
*     summary: Generate a new token
*     tags: [Account Api]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Account'
*     responses:
*       200:
*         description: Token has been generated
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.post('/refreshToken', Account.refreshToken);

/**
* @swagger
* /auth/update:
*  post:
*     summary: Update an account
*     tags: [Account Api]
*     requestBody:
*        required: true
*        content:
*           application/json:
*            schema:
*                $ref: '#components/schemas/Account'
*     responses:
*       200:
*         description: Account has been updated
*       400:
*         description: Bad Request
*       401:
*         description: Unauthorized
*       403:
*         description:  Forbidden
*/

router.post('/update', authenticate([constants.USER, constants.CLIENT]), Account.update);

module.exports = router