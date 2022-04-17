const express = require('express');
const router = express.Router();
const Account = require('../controllers/account_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Account Api
*   description: The Account API
*/

router.post('/register', Account.register);
router.post('/login', Account.login);
router.delete('/logout', Account.logout);
router.post('/refreshToken', Account.refreshToken);
router.post('/update', Account.update);

router.get('/register', Account.getRegister);
router.get('/login', Account.getLogin);
router.get('/logout', authenticate, Account.getLogout);


module.exports = router