const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Answer:
 *      type: object
 *      required:
 *        - answer
 *        - is_deleted
 *        - poll_id
 *        - poll_question_id
 *        - user_id
 *      properties:
 *        answer:
 *          type: string
 *        is_deleted:
 *          type: boolean
 *          default: false
 *        poll_id:
 *          type: string
 *        poll_question_id:
 *          type: string
 *        user_id:
 *          type: string
 */

const answerSchema = new mongoose.Schema({

    answer: {
        type: String,
        required: [true, "Please enter an answer"]
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    poll_id: {
        type: String,
        required: [true, "Please enter a poll id"]
    },
    poll_question_id: {
        type: String,
        required: [true, "Please enter a poll question id"]
    },
    user_id: {
        type: String,
        required: [true, "Please enter a user id"]
    },

}, {timestamps:true});

module.exports = mongoose.model('Answer', answerSchema);