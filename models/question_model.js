const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Question:
 *      type: object
 *      required:
 *        - question
 *      properties:
 *        question:
 *          type: string
 *          default: Age
 *        multi_choice:
 *          type: array
 *          items:
 *             type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *      example:
 *        question: test  question
 *        multi_choice: [t1, t2, t3]
 */

const QuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, "Please enter a question"]
    },
    multi_choice: {
        type: [String]
    }

}, {timestamps:true});

module.exports = mongoose.model('Question', QuestionSchema);