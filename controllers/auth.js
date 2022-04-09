const Account = require('../models/account_model')
const jwt = require('jsonwebtoken')         

const handleErrors = (err) => {
    let errors = { email: "", password: "" }
    if (err.code === 11000) {
        errors.email = "The account is already registered"
    }
    if (err.message.includes("Account validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


const sendError = (res, code, msg) => {
    return res.status(code).json({
        'status': 'fail',
        'error': msg
    })
}

const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;
    if(password !== confirmPassword){
        res.status(400).json({email: "", password: "Passwords do not match" });
        return;
    }
    try {

        newAccount = await Account.create({ "email": email, "password": password});
         res.status(200).send();

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ erros });
    }
}


const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) return sendError(res, 400, 'Missing email or password')

    try {
        const account = await Account.login(email, password);
        const accessToken = generateAccessToken(account);
        const refreshToken = generateRefreshToken(account);
        if (account.refresh_tokens == null) account.refresh_tokens = [refreshToken]
        else account.refresh_tokens.push(refreshToken)
        await account.save();
        res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });

    } catch (err) {
        return sendError(res, 400, err.message)
    }

}

const refreshToken = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return sendError(res, 401, 'No refresh token')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, accountInfo) => {

        if (err) return sendError(res, 403, err.message)
        const accountId = accountInfo.id
        try {
            const account = await Account.findById(accountId)
            if (account == null) return sendError(res, 403, 'Invalid request');
            if (!account.refresh_tokens.includes(token)) {
                account.refresh_tokens = []
                await account.save()
                return sendError(res, 403, 'Invalid request');
            }

            const accessToken = generateAccessToken(account)
            const refreshToken = generateRefreshToken(account)
            account.refresh_tokens[account.refresh_tokens.indexOf(token)] = refreshToken
            await account.save()
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
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, accountInfo) => {

        if (err) return sendError(res, 403, err.message)
        const accountId = accountInfo.id
        try {
            const account = await Account.findById(accountId)
            if (account == null) return sendError(res, 403, 'Invalid request')
            if (!account.refresh_tokens.includes(token)) {
                account.refresh_tokens = []
                await account.save()
                return sendError(res, 403, 'invalid request')
            }
            account.refresh_tokens.splice(account.refresh_tokens.indexOf(token), 1)
            await account.save()
            res.status(200).send();
        } catch (err) {
            return sendError(res, 403, err.message)
        }
    })

}

function generateAccessToken(account) {
    return jwt.sign(
        { 'id': account._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    )
}

function generateRefreshToken(account) {
    return jwt.sign(
        { 'id': account._id },
        process.env.REFRESH_TOKEN_SECRET
    )
}

module.exports = {
    login,
    register,
    logout,
    refreshToken
}