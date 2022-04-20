const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Poll:
 *      type: object
 *      required:
 *        - pollName
 *      properties:
 *        pollName:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *      example:
 *        pollName: test poll name
 */

const pollSchema = new mongoose.Schema({

    pollName: {
        type: String,
        required: [true, "Please enter a poll name"]
    }

}, {timestamps:true});

module.exports = mongoose.model('Poll', pollSchema);