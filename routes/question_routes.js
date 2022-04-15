const express = require('express');
const router = express.Router();
const Question = require('../controllers/question_controller');
const authenticate = require("../common/auth_middleware");

router.post('/create',authenticate, Question.create);

router.get('/create', authenticate, Question.getCreate);

module.exports = router