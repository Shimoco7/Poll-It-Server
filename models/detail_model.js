const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

/**
 * @swagger
 * components:
 *  schemas:
 *    Detail:
 *      type: object
 *      required:
 *        - answer
 *        - question
 *        - questionId
 *        - accountId
 *      properties:
 *        answer:
 *          type: string
 *        question:
 *          type: string
 *        questionId:
 *          type: string
 *        accountId:
 *          type: string
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        answer: test answer
 *        question: test question
 *        questionId: 625ae81de847b7c2701e0a38
 *        accountId: 625ae81de847b7c2701e0a38       
 */

const detailSchema = new mongoose.Schema({

    answer: {
        type: String,
        required: [true, "Please enter an answer"]
    },
    question: {
        type: String,
        required: [true, "Please enter a detail question"]
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.DETAIL_QUESTION,
        required: [true, "Please enter a detail question id"]
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.ACCOUNT,
        required: [true, "Please enter an account id"]
    }

});

detailSchema.plugin(timestamps);
module.exports = mongoose.model(constants.DETAIL, detailSchema);