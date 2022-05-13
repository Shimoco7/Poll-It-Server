const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

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
 *        age:
 *          type: array
 *          items:
 *             type: string
 *          example: ["11-20", "21-30", "31-40", "41-50","51-60", "61-70", "71-80", "81-90", "More than 90"]
 *        gender:
 *          type: array
 *          items:
 *             type: string
 *          example: ["Male", "Female", "Don't Wish To Specify"]
 *        educationLevel:
 *          type: array
 *          items:
 *             type: string
 *          example: ["Preschool", "Elementary", "Middle School", "High School", "During Bachelor's", "Bachelor's or Higher"]
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
 *        income:
 *          type: array
 *          items:
 *             type: string
 *          example: ["0-5,000", "5,001-10,000", "10,001-20,000", "20,001-30,000", "More than 30,000"]
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
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.ACCOUNT,
        required:  [true, "Please enter an account id"]
    },
    age: {
        type: [String],
        enum: ["11-20", "21-30", "31-40", "41-50","51-60", "61-70", "71-80", "81-90", "More than 90"],
        default: ["11-20", "21-30", "31-40", "41-50","51-60", "61-70", "71-80", "81-90", "More than 90"]
    },
    gender: {
        type: [String],
        enum: ["Male", "Female", "Don't Wish To Specify"],
        default: ["Male", "Female", "Don't Wish To Specify"]
    },
    educationLevel: {
        type: [String],
        enum: ["Preschool", "Elementary", "Middle School", "High School", "During Bachelor's", "Bachelor's or Higher"],
        default: ["Preschool", "Elementary", "Middle School", "High School", "During Bachelor's", "Bachelor's or Higher"]
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
    },
    income: {
        type: [String],
        enum: ["0-5,000", "5,001-10,000", "10,001-20,000", "20,001-30,000", "More than 30,000"],
        default: ["0-5,000", "5,001-10,000", "10,001-20,000", "20,001-30,000", "More than 30,000"]
    }
    
});

pollSchema.plugin(timestamps);
module.exports = mongoose.model(constants.POLL, pollSchema);