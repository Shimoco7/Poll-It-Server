const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Answer:
 *      type: object
 *      required:
 *        - answer
 *        - isDeleted
 *        - pollId
 *        - pollQuestionId
 *        - accountId
 *      properties:
 *        answer:
 *          type: string
 *        isDeleted:
 *          type: boolean
 *          default: false
 *        pollId:
 *          type: string
 *        pollQuestionId:
 *          type: string
 *        accountId:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
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
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    pollId: {
        type: String,
        required: [true, "Please enter a poll id"]
    },
    pollQuestionId: {
        type: String,
        required: [true, "Please enter a poll question id"]
    },
    accountId: {
        type: String,
        required: [true, "Please enter an account id"]
    },

}, {timestamps:true});

module.exports = mongoose.model('Answer', answerSchema);