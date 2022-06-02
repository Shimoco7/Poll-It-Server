const mongoose = require("mongoose");
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - accountId
 *        - rewardId
 *        - title
 *        - supplierImage
 *        - purchaseDate
 *        - expirationDate
 *      properties:
 *        accountId:
 *          type: string
 *        rewardId:
 *          type: string
 *        title:
 *          type: string
 *        supplierImage:
 *          type: string
 *        purchaseDate:
 *          type: integer
 *        expirationDate:
 *          type: integer
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        accountId: 4eb6e7e7e9b7f4194e000003
 *        rewardId: 4eb6e7e7e9b7f4194e000004
 *        title: test title
 *        supplierImage:  https://poll-it.cs.colman.ac.il/storage/images/starbucks.png
 *        purchaseDate: 1653123955
 *        expirationDate: 1655123955
 * 
 */

const orderSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.ACCOUNT,
        required: [true, "Please enter an account id"]
    },
    rewardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.REWARD,
        required: [true, "Please enter a reward id"]
    },
    title: {
        type: String,
        required: [true, "Please enter a reward title"]
    },
    supplierImage: {
        type: String
    },
    purchaseDate: {
        type: Number
    },
    expirationDate: {
        type: Number
    }
});

orderSchema.plugin(timestamps);
module.exports = mongoose.model(constants.ORDER, orderSchema);