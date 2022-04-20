const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcryptjs = require('bcryptjs');

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
 *        refresh_token:
 *          type: string
 *        name:
 *          type: string
 *        gender:
 *          type: string
 *          enum: [Male, Female, Don't Wish To Specify]
 *        profile_pic_url:
 *          type: string   
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
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
    refresh_token: {
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
    profile_pic_url: {
        type: String
    }
}, {timestamps:true});

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

module.exports = mongoose.model('Account', accountSchema);