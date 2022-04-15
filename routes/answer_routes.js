const express = require('express');
const router = express.Router();
const Answer = require('../controllers/answer_controller');
const authenticate = require("../common/auth_middleware");

router.post('/create', Answer.create);
router.get('/create', Answer.getCreate);

module.exports = router