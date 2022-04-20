const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    PollQuestion:
 *      type: object
 *      required:
 *        - poll_question
 *        - poll_question_type
 *        - pollId
 *      properties:
 *        poll_question:
 *          type: string
 *        poll_question_type:
 *          type: enum
 *          enum: [Multi Choice, Image]
 *          default: Multi Choice
 *        choices:
 *          type: array
 *          items:
 *             type: string
 *        pollId:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *      example:
 *        poll_question: test poll question
 *        poll_question_type: Multi Choice
 *        choices: [t1, t2, t3]
 *        pollId: 625ae81de847b7c2701e0a38
 */

const pollQuestionSchema = new mongoose.Schema({

    poll_question: {
        type: String,
        required: [true, "Please enter a poll question"]
    },
    poll_question_type: {
        type: String,
        required: [true, "Please enter a poll question type"],
        enum: {values:["Multi Choice", "Image"], message: "Please enter a valid poll question type"},
        default: "Multi Choice"
    },
    choices: {
        type: [String]
    },
    pollId:{
        type: String ,
        required: [true, "Please enter a poll id"]
    }

}, {timestamps:true});

module.exports = mongoose.model('PollQuestion', pollQuestionSchema, "polls_questions");