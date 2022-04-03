const User = require('../models/user_model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        const exists = await User.findOne({ 'email': email })
        if (exists != null) {
            return res.status(400).send({
                'status': 'fail',
                'error': 'user exists'
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPwd = await bcryptjs.hash(password, salt)

        const user = User({
            'email': email,
            'password': hashPwd
        })
        newUser = await user.save();
        res.status(200).send(newUser)

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (email == null || password == null) return sendError(res, 400, 'wrong email or password')

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

        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try {
            user = await User.findById(userId)
            if (user == null) return res.status(403).send('invalid request')
            if (!user.tokens.includes(token)) {
                user.tokens = []
                await user.save()
                return res.status(403).send('invalid request')
            }

            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            user.tokens[user.tokens.indexOf(token)] = refreshToken
            await user.save()
            res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
        } catch (err) {
            res.status(403).send(err.message)
        }
    })
}

const logout = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus('401')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {

        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try {
            user = await User.findById(userId)
            if (user == null) return res.status(403).send('invalid request')
            if (!user.tokens.includes(token)) {
                user.tokens = []
                await user.save()
                return res.status(403).send('invalid request')
            }
            user.tokens.splice(user.tokens.indexOf(token), 1)
            await user.save()
            res.status(200).send();
        } catch (err) {
            res.status(403).send(err.message)
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