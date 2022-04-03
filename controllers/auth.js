const User = require('../models/user_model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    let errors = {email:"", password:""}
    if(err.code === 11000){
        errors.email = "The user is already registered"
    }
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


const sendError = (res, code, msg) => {
    return res.status(code).send({
        'status': 'fail',
        'error': msg
    })
}

const register = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {

        newUser = await User.create({email, password});
        res.status(200).send(newUser);

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({erros});
    }
}


const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (email == null || password == null) return sendError(res, 400, 'missing email or password')

    try {
        const user = await User.findOne({ 'email': email })
        if (user == null) return sendError(res, 400, 'wrong email or password')

        const match = await bcryptjs.compare(password, user.password)
        if (!match) return sendError(res, 400, 'wrong email or password')

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        if (user.tokens == null) user.tokens = [refreshToken]
        else user.tokens.push(refreshToken)
        await user.save()
        res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken })

    } catch (err) {
        return sendError(res, 400, err.message)
    }

}

const refreshToken = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return sendError(res, 401, 'no refresh token')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {

        if (err) return sendError(res, 403, err.message)
        const userId = userInfo.id
        try {
            user = await User.findById(userId)
            if (user == null) return sendError(res, 403, 'invalid request');
            if (!user.tokens.includes(token)) {
                user.tokens = []
                await user.save()
                return sendError(res, 403, 'invalid request');
            }

            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            user.tokens[user.tokens.indexOf(token)] = refreshToken
            await user.save()
            res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
        } catch (err) {
            return sendError(res, 403, err.message);
        }
    })
}

const logout = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send()
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {

        if (err) return sendError(res, 403, err.message)
        const userId = userInfo.id
        try {
            user = await User.findById(userId)
            if (user == null)  return sendError(res, 403, 'invalid request')
            if (!user.tokens.includes(token)) {
                user.tokens = []
                await user.save()
                return sendError(res, 403, 'invalid request')
            }
            user.tokens.splice(user.tokens.indexOf(token), 1)
            await user.save()
            res.status(200).send();
        } catch (err) {
            return sendError(res, 403, err.message)
        }
    })

}

function generateAccessToken(user) {
    return jwt.sign(
        { 'id': user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    )
}

function generateRefreshToken(user) {
    return jwt.sign(
        { 'id': user._id },
        process.env.REFRESH_TOKEN_SECRET
    )
}

module.exports = {
    login,
    register,
    logout,
    refreshToken
}