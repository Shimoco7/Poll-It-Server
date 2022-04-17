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
 *        - poll_id
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
 *        poll_id:
 *          type: string
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
    poll_id:{
        type: String ,
        required: [true, "Please enter a poll id"]
    }

}, {timestamps:true});

module.exports = mongoose.model('PollQuestion', pollQuestionSchema, "polls_questions");