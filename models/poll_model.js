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
 *        image:
 *          type: string
 *        coins:
 *          type: integer
 *          default: 0
 *        maxUsers:
 *          type: integer
 *          default: 100
 *        disabled:
 *          type: boolean
 *          default: false
 *        pollQuestions:
 *          type: array
 *          items:
 *             type: string
 *          example: ["4eb6e7e7e9b7f4194e000003"]
 *        users:
 *          type: array
 *          items:
 *             type: string
 *          example: ["4eb6e7e7e9b7f4194e000004"]
 *        age:
 *          type: array
 *          items:
 *             type: string
 *          default: ["11-20", "21-30", "31-40", "41-50","51-60", "61-70", "71-80", "81-90", "More than 90"]
 *        gender:
 *          type: array
 *          items:
 *             type: string
 *          default: ["Male", "Female", "Dont Wish To Specify"]
 *        educationLevel:
 *          type: array
 *          items:
 *             type: string
 *          default: ["Preschool", "Elementary", "Middle School", "High School", "During Bachelors", "Bachelors or Higher"]
 *        maritalStatus:
 *          type: array
 *          items:
 *             type: string
 *          default: ["Single", "Married", "Widowed", "Divorced", "Separated"]
 *        numberOfChildrens:
 *          type: array
 *          items:
 *             type: string
 *          default: ["0", "1", "2", "3", "4", "5", "More than 5"]
 *        permanentJob:
 *          type: array
 *          items:
 *             type: string
 *          default: ["Yes", "No"]
 *        income:
 *          type: array
 *          items:
 *             type: string
 *          default: ["0-5,000", "5,001-10,000", "10,001-20,000", "20,001-30,000", "More than 30,000"]
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        pollName: test poll name
 *        accountId: 625ae81de847b7c2701e0a38
 *        image: https://poll-it.cs.colman.ac.il/storage/images/defaultPoll.png
 *        coins: 10 
 *        maxUsers: 300
 *        disabled: false  
 */

const pollSchema = new mongoose.Schema({

    pollName: {
        type: String,
        required: [true, "Please enter a poll name"]
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.ACCOUNT,
        required: [true, "Please enter an account id"]
    },
    image: {
        type: String
    },
    coins: {
        type: Number,
        default: 0
    },
    maxUsers: {
        type: Number,
        default: 100,
        min: 0,
        max: 500
    },
    disabled: {
        type: Boolean,
        default: false
    },
    pollQuestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: constants.POLL_QUESTION
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: constants.ACCOUNT
        }
    ],
    age: {
        type: [String],
        enum: ["11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "More than 90"],
        default: ["11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "More than 90"]
    },
    gender: {
        type: [String],
        enum: ["Male", "Female", "Dont Wish To Specify"],
        default: ["Male", "Female", "Dont Wish To Specify"]
    },
    educationLevel: {
        type: [String],
        enum: ["Preschool", "Elementary", "Middle School", "High School", "During Bachelors", "Bachelors or Higher"],
        default: ["Preschool", "Elementary", "Middle School", "High School", "During Bachelors", "Bachelors or Higher"]
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
        default: ["Yes", "No"]
    },
    income: {
        type: [String],
        enum: ["0-5,000", "5,001-10,000", "10,001-20,000", "20,001-30,000", "More than 30,000"],
        default: ["0-5,000", "5,001-10,000", "10,001-20,000", "20,001-30,000", "More than 30,000"]
    }

});

pollSchema.plugin(timestamps);
module.exports = mongoose.model(constants.POLL, pollSchema);