const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');

/**
 * @swagger
 * components:
 *  schemas:
 *    PollQuestion:
 *      type: object
 *      required:
 *        - pollQuestion
 *        - pollQuestionType
 *        - pollId
 *      properties:
 *        pollQuestion:
 *          type: string
 *        pollQuestionImage:
 *          type: string
 *        pollQuestionType:
 *          type: enum
 *          enum: [Multi Choice, Image Answers, Image Question, Scorll Down Answers]
 *          default: Multi Choice
 *        choices:
 *          type: array
 *          items:
 *             type: string
 *        pollId:
 *          type: string
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        pollQuestion: test poll question
 *        pollQuestionType: Multi Choice
 *        choices: [t1, t2, t3]
 *        pollId: 625ae81de847b7c2701e0a38
 */

const pollQuestionSchema = new mongoose.Schema({

    pollQuestion: {
        type: String,
        required: [true, "Please enter a poll question"]
    },
    pollQuestionImage: {
        type: String
    },
    pollQuestionType: {
        type: String,
        required: [true, "Please enter a poll question type"],
        enum: {values:["Multi Choice", "Image Answers", "Image Question", "Scorll Down Answers"], message: "Please enter a valid poll question type"},
        default: "Multi Choice"
    },
    choices: {
        type: [String]
    },
    pollId:{
        type: String ,
        required: [true, "Please enter a poll id"]
    }

});

pollQuestionSchema.plugin(timestamps);
module.exports = mongoose.model('PollQuestion', pollQuestionSchema);