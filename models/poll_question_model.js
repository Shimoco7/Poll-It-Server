const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

/**
 * @swagger
 * components:
 *  schemas:
 *    PollQuestion:
 *      type: object
 *      required:
 *        - pollQuestion
 *        - pollId
 *        - pollQuestionType
 *      properties:
 *        pollQuestion:
 *          type: string
 *        pollId:
 *          type: string
 *        pollQuestionType:
 *          type: enum
 *          enum: [Multi Choice, Image Answers, Image Question, Scroll Down]
 *          default: Multi Choice
 *        pollQuestionImage:
 *          type: string
 *        choices:
 *          type: array
 *          items:
 *             type: string
 *        answers:
 *          type: array
 *          items:
 *             type: string
 *          example: ["4eb6e7e7e9b7f4194e000003"]
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        pollQuestion: test poll question
 *        pollId: 625ae81de847b7c2701e0a38
 *        pollQuestionType: Multi Choice
 *        choices: [t1, t2, t3]
 */

const pollQuestionSchema = new mongoose.Schema({

    pollQuestion: {
        type: String,
        required: [true, "Please enter a poll question"]
    },
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.POLL,
        required: [true, "Please enter a poll id"]
    },
    pollQuestionType: {
        type: String,
        required: [true, "Please enter a poll question type"],
        enum: { values: ["Multi Choice", "Image Answers", "Image Question", "Scroll Down"], message: "Please enter a valid poll question type" },
        default: "Multi Choice"
    },
    pollQuestionImage: {
        type: String
    },
    choices: {
        type: [String]
    },
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: constants.ANSWER
        }
    ]
});

pollQuestionSchema.plugin(timestamps);
module.exports = mongoose.model(constants.POLL_QUESTION, pollQuestionSchema);