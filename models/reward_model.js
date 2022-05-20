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
 *        image:
 *          type: string
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        title: test title
 *        description: test description
 *        image: https://10.10.248.124:8000/storage/images/coffee.jpg
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
        min: 0,
        required: [true, "Please enter an amount of coins"]
    },
    image: {
        type: String
    },

});

rewardSchema.plugin(timestamps);
module.exports = mongoose.model(constants.REWARD, rewardSchema);