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
 *        supplier:
 *          type: string
 *        supplierImage:
 *          type: string
 *        orders:
 *          type: array
 *          items:
 *             type: string
 *          example: ["4eb6e7e7e9b7f4194e000004"]
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        title: test title
 *        description: test description
 *        image: https://poll-it.cs.colman.ac.il/storage/images/coffee.jpg
 *        price: 5
 *        supplier: test supplier
 *        supplierImage:  https://poll-it.cs.colman.ac.il/storage/images/starbucks.png
 */

const rewardSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: [true, "Please enter a reward title"]
    },
    description: {
        type: String,
        required: [true, "Please enter a reward description"]
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Please enter a reward price"]
    },
    image: {
        type: String
    },
    supplier: {
        type: String
    },
    supplierImage: {
        type: String
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: constants.ORDER
        }
    ]
});

rewardSchema.plugin(timestamps);
module.exports = mongoose.model(constants.REWARD, rewardSchema);