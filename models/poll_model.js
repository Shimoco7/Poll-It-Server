const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Poll:
 *      type: object
 *      required:
 *        - poll_name
 *      properties:
 *        poll_name:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */

const pollSchema = new mongoose.Schema({

    poll_name: {
        type: String,
        required: [true, "Please enter a poll name"]
    }

}, {timestamps:true});

module.exports = mongoose.model('Poll', pollSchema);