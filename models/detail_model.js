const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Detail:
 *      type: object
 *      required:
 *        - answer
 *        - question
 *        - question_id
 *        - uid
 *      properties:
 *        answer:
 *          type: string
 *        question:
 *          type: string
 *        question_id:
 *          type: string
 *        uid:
 *          type: string
 */

const detailSchema = new mongoose.Schema({

    answer: {
        type: String,
        required: [true, "Please enter an answer"]
    },
    question: {
        type: String,
        required: [true, "Please enter a question"]
    },
    question_id: {
        type: String,
        required: [true, "Please enter a question id"]
    },
    uid: {
        type: String,
        required: [true, "Please enter a uid"]
    }

}, {timestamps:true});

module.exports = mongoose.model('Detail', detailSchema);