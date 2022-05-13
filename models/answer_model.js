const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

/**
 * @swagger
 * components:
 *  schemas:
 *    Answer:
 *      type: object
 *      required:
 *        - answer
 *        - pollId
 *        - pollQuestionId
 *        - accountId
 *      properties:
 *        answer:
 *          type: string
 *        pollId:
 *          type: string
 *        pollQuestionId:
 *          type: string
 *        accountId:
 *          type: string
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        answer: test answer
 *        pollId: 625ae81de847b7c2701e0a38
 *        pollQuestionId: 625ae81de847b7c2701e0a38
 *        accountId: 625ae81de847b7c2701e0a38
 */

const answerSchema = new mongoose.Schema({

    answer: {
        type: String,
        required: [true, "Please enter an answer"]
    },
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.POLL,
        required:  [true, "Please enter a poll id"]
    },
    pollQuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.POLL_QUESTION,
        required: [true, "Please enter a poll question id"]
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.ACCOUNT,
        required:  [true, "Please enter an account id"]
    },

});

answerSchema.plugin(timestamps);
module.exports = mongoose.model(constants.ANSWER, answerSchema);