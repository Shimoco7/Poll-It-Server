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

router.post('/create', authenticate, Detail.create);
router.get('/getDetailsByUid', authenticate, Detail.getDetailsByUid);

module.exports = router