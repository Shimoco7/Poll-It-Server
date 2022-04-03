const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    tokens: {
        type: [String]
    }
});

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({email});
    if (user == null) throw Error("Incorrect Email");

    const match = await bcryptjs.compare(password, user.password)
    if (!match) throw Error("Incorrect Password");

    return user;
}

module.exports = mongoose.model('User', userSchema);