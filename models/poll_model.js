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

});

pollSchema.plugin(timestamps);
module.exports = mongoose.model('Poll', pollSchema);