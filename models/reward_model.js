const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

/**
 * @swagger
 * components:
 *  schemas:
 *    Reward:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: integer
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        title: test title
 *        description: test description
 *        price: 5 
 */

const rewardSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: [true, "Please enter a reward title"]
    },
    description: {
        type: String,
        required: [true, "Please enter a rewards description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter an amount of coins"]
    }

});

rewardSchema.plugin(timestamps);
module.exports = mongoose.model(constants.REWARD, rewardSchema);