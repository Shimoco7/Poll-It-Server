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
 *        maritalStatus:
 *          type: array
 *          items:
 *             type: string
 *          example: ["Single", "Married", "Widowed", "Divorced", "Separated"]
 *        numberOfChildrens:
 *          type: array
 *          items:
 *             type: string
 *          example: ["0", "1", "2", "3", "4", "5", "More than 5"]
 *        permanentJob:
 *          type: array
 *          items:
 *             type: string
 *          example: ["Yes", "No"]
 *        individualIncome:
 *          type: array
 *          items:
 *             type: string
 *          example: ["0-5,000", "5,000-10,000", "10,000-20,000", "20,000-30,000", "More than 30,000"]
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
    maritalStatus: {
        type: [String],
        enum: ["Single", "Married", "Widowed", "Divorced", "Separated"],
        default: ["Single", "Married", "Widowed", "Divorced", "Separated"]
    },
    numberOfChildrens: {
        type: [String],
        enum: ["0", "1", "2", "3", "4", "5", "More than 5"],
        default: ["0", "1", "2", "3", "4", "5", "More than 5"]
    },
    permanentJob: {
        type: [String],
        enum: ["Yes", "No"],
        default:  ["Yes", "No"]
    },individualIncome: {
        type: [String],
        enum: ["0-5,000", "5,000-10,000", "10,000-20,000", "20,000-30,000", "More than 30,000"],
        default: ["0-5,000", "5,000-10,000", "10,000-20,000", "20,000-30,000", "More than 30,000"]
    }
    
});

pollSchema.plugin(timestamps);
module.exports = mongoose.model('Poll', pollSchema);