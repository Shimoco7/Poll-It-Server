const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');

/**
 * @swagger
 * components:
 *  schemas:
 *    Poll:
 *      type: object
 *      required:
 *        - pollName
 *        - accountId
 *      properties:
 *        pollName:
 *          type: string
 *        accountId:
 *          type: string
 *        gender:
 *          type: array
 *          items:
 *             type: string
 *          example: ["Male", "Female", "Don't Wish To Specify"]
 *        minAge:
 *          type: integer
 *        maxAge:
 *          type: integer
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        pollName: test poll name
 */

const pollSchema = new mongoose.Schema({

    pollName: {
        type: String,
        required: [true, "Please enter a poll name"]
    },
    accountId: {
        type: String,
        required: [true, "Please enter an account id"]
    },
    gender: {
        type: [String],
        enum: ["Male", "Female", "Don't Wish To Specify"],
        default: ["Male", "Female", "Don't Wish To Specify"]
    },
    minAge: {
        type: String,
        default: "0"
    },
    maxAge: {
        type: Number,
        default: "120"
    },
});

pollSchema.plugin(timestamps);
module.exports = mongoose.model('Poll', pollSchema);