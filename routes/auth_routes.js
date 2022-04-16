const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth_controller');
const authenticate = require("../common/auth_middleware");

/**
* @swagger
* tags:
*   name: Auth Api
*   description: The Auth API
*/

router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.delete('/logout', Auth.logout);
router.post('/refreshToken', Auth.refreshToken);
router.post('/update', Auth.update);

router.get('/register', Auth.getRegister);
router.get('/login', Auth.getLogin);
router.get('/logout', authenticate, Auth.getLogout);


module.exports = router