const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    DetailQuestion:
 *      type: object
 *      required:
 *        - detailQuestion
 *      properties:
 *        detailQuestion:
 *          type: string
 *          default: Age
 *        choices:
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
 *        detailQuestion: test  question
 *        choices: [t1, t2, t3]
 */

const DetailQuestionSchema = new mongoose.Schema({

    detailQuestion: {
        type: String,
        required: [true, "Please enter a detail question"]
    },
    choices: {
        type: [String]
    }

}, {timestamps:true});

module.exports = mongoose.model('DetailQuestion', DetailQuestionSchema);