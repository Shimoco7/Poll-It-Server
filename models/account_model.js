const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcryptjs = require('bcryptjs');
var timestamps = require('mongoose-unix-timestamp-plugin');
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
 *          enum: [User, Client]
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
 *          enum: [Male, Female, Don't Wish To Specify]
 *        profilePicUrl:
 *          type: string   
 *        createdAt:
 *          type: integer
 *        updatedAt:
 *          type: integer
 *      example:
 *        email: test@test.com
 *        password: Test1234@
 */

const accountSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['User', 'Client'],
        required: [true, 'Please a role'],
        default: 'User'
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
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,100}$/,"Minimum 8 characters, at least one uppercase, at least one lower case, at least one digit, at least one special character"]  
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
        enum: {values:["Male", "Female", "Don't Wish To Specify"], message: "Please enter a valid gender"}
    },
    profilePicUrl: {
        type: String
    }
});
accountSchema.plugin(timestamps);

accountSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})

accountSchema.statics.login = async function (email, password){
    const account = await this.findOne({email});
    if (account == null) throw Error("Incorrect Email");

    const match = await bcryptjs.compare(password, account.password)
    if (!match) throw Error("Incorrect Password");

    return account;
}


accountSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,100}$/.test(this._update.password)) {
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


module.exports = mongoose.model('Account', accountSchema);