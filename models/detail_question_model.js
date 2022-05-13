const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

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
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        detailQuestion: test detail question
 *        choices: [t1, t2, t3]
 */

const detailQuestionSchema = new mongoose.Schema({

    detailQuestion: {
        type: String,
        required: [true, "Please enter a detail question"]
    },
    choices: {
        type: [String]
    }

});

detailQuestionSchema.plugin(timestamps);
module.exports = mongoose.model(constants.DETAIL_QUESTION, detailQuestionSchema);