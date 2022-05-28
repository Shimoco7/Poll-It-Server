const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcryptjs = require('bcryptjs');
var timestamps = require('mongoose-unix-timestamp-plugin');
const constants = require('../common/constants');

/**
 * @swagger
 * components:
 *  schemas:
 *    Account:
 *      type: object
 *      required:
 *        - role
 *        - email
 *        - password
 *      properties:
 *        role:
 *          type: string
 *          enum: [User, Client, Admin]
 *          default: User
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        refreshToken:
 *          type: string
 *        name:
 *          type: string
 *        address:
 *          type: string
 *        gender:
 *          type: string
 *          enum: [Male, Female, Dont Wish To Specify]
 *        profilePicUrl:
 *          type: string   
 *        facebookId:
 *          type: string
 *        coins:
 *          type: integer
 *          default: 0
 *        rank:
 *          type: double
 *          default: 3
 *        details:
 *          type: array
 *          items:
 *             type: string
 *          example: ["4eb6e7e7e9b7f4194e000002"]
 *        polls:
 *          type: array
 *          items:
 *             type: string
 *          example: ["4eb6e7e7e9b7f4194e000003"]
 *        rewards:
 *          type: array
 *          items:
 *             type: object
 *          example: [{_id: "4eb6e7e7e9b7f4194e000005", rewardId: "4eb6e7e7e9b7f4194e000003", title: title, supplierImage:  https://poll-it.cs.colman.ac.il/storage/images/starbucks.png , purchaseDate: 1653123955, expirationDate: 1655123955 }]
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        email: test@swaggertest.com
 *        password: Test1234@
 */

const accountSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: [constants.USER, constants.CLIENT, constants.ADMIN],
        required: [true, 'Please choose a role'],
        default: constants.USER
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,100}$/, "Minimum 8 characters, at least one uppercase, at least one lower case, at least one digit, at least one special character"]
    },
    refreshToken: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: { values: ["Male", "Female", "Dont Wish To Specify"], message: "Please enter a valid gender" }
    },
    profilePicUrl: {
        type: String
    },
    facebookId: {
        type: String
    },
    coins: {
        type: Number,
        min: 0,
        default: 0
    },
    rank: {
        type: Number,
        min: 0,
        max: 10,
        default: 3
    },
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.DETAIL
    }],
    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.POLL
    }],
    rewards: [{
        rewardId: mongoose.Schema.Types.ObjectId,
        title: String,
        supplierImage: String,
        purchaseDate: Number,
        expirationDate: Number
    }]
});
accountSchema.plugin(timestamps);

accountSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})

accountSchema.statics.login = async function (email, password) {
    const account = await this.findOne({ email });
    if (account == null) throw Error("Incorrect Email");

    const match = await bcryptjs.compare(password, account.password)
    if (!match) throw Error("Incorrect Password");

    if (account.facebookId) throw Error("There's already a Facebook account associated with your email, please login with your facebook account");
    return account;
}

accountSchema.statics.facebookLogin = async function (email) {
    const account = await this.findOne({ email });
    if (account == null) throw Error("Incorrect Email");
    if (!account.facebookId) throw Error("There's no account associated with your Facebook account");
    return account;
}

accountSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,100}$/.test(this._update.password)) {
                throw Error("Minimum 8 characters, at least one uppercase, at least one lower case, at least one digit, at least one special character")
            }
            const salt = await bcryptjs.genSalt();
            this._update.password = await bcryptjs.hash(this._update.password, salt)
        }
        next();
    } catch (err) {
        return next(err);
    }
});


module.exports = mongoose.model(constants.ACCOUNT, accountSchema);