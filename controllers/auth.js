const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let refreshTokens = []

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
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, salt)

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

        const match = await bcrypt.compare(password, user.password)
        if (!match) return sendError(res, 400, 'wrong email or password')

        const accessToken = generateAccessToken(user)
        const refreshToken = await jwt.sign(
            { 'id': user._id },
            process.env.REFRESH_TOKEN_SECRET
        )
        refreshTokens.push(refreshToken)
        res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken })

    } catch (err) {
        return sendError(res, 400, err.message)
    }

}

const token = async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return sendError(res, 401, 'no refresh token')
    if (!refreshTokens.includes(refreshToken)) return sendError(res, 403, 'no refresh token')
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return sendError(res, 403, fail)
        const accessToken = generateAccessToken({ 'id': user._id })
        res.status(200).send({ 'accessToken': accessToken})

    }
    )
}

const logout = async (req, res) => {
    if (refreshTokens.includes(req.body.token)){
        refreshTokens = refreshTokens.filter(token=>token!==req.body.token)
    }
    res.status(204)
}

function generateAccessToken(user) {
    return jwt.sign(
        { 'id': user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    )
}

module.exports = {
    login,
    register,
    logout,
    token
}