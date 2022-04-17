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
 */

const pollSchema = new mongoose.Schema({

    poll_name: {
        type: String,
        required: [true, "Please enter a poll name"]
    }

}, {timestamps:true});

module.exports = mongoose.model('Poll', pollSchema);