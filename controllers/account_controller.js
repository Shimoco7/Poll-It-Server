const SCHEMA = "Account"
const Account = require('../models/account_model');
const jwt = require('jsonwebtoken');
const helpers = require("../common/helpers");

const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const newAccount = await Account.create({ "email": email, "password": password });
        res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}


const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    var detailsFilled = true;
    if (email == null || password == null) return helpers.sendError(res, 400, "Missing email or password")

    try {
        const account = await Account.login(email, password);
        const accessToken = generateAccessToken(account);
        const refreshToken = generateRefreshToken(account);
        if (account.refresh_token != refreshToken) {
            account.refresh_token = refreshToken;
            await account.save();
        }
        if (account.role == "User") {
            if (account.name == null || account.address == null || account.gender == null) {
                detailsFilled = false;
            }
        }

        res.status(200).send({ "accessToken": accessToken, "refreshToken": refreshToken, "account": account, "detailsFilled": detailsFilled });

    } catch (err) {
        return helpers.sendError(res, 400, err.message)
    }

}

const logout = async (req, res) => {
    const token = req.body.refresh_token;
    if (token == null) return helpers.sendError(res, 401, 'No refresh token')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, accountInfo) => {

        if (err) return helpers.sendError(res, 403, err.message)
        const accountId = accountInfo.id;
        try {
            const account = await Account.findById(accountId)
            if (account == null) return helpers.sendError(res, 403, 'Invalid request')
            if (account.refresh_token != token) {
                account.refresh_token = undefined;
                await account.save();
                return helpers.sendError(res, 403, 'invalid request')
            }
            account.refresh_token = undefined;
            await account.save();
            res.status(200).send();
        } catch (err) {
            return helpers.sendError(res, 400, err.message)
        }
    })

}

const refreshToken = async (req, res) => {
    const token = req.body.refresh_token;
    if (token == null) return helpers.sendError(res, 401, 'No refresh token')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, accountInfo) => {

        if (err) return helpers.sendError(res, 403, err.message)
        const accountId = accountInfo.id;
        try {
            const account = await Account.findById(accountId)
            if (account == null) return helpers.sendError(res, 403, 'Invalid request');
            if (account.refresh_token != token) {
                account.refresh_token = undefined;
                await account.save();
                return helpers.sendError(res, 403, 'Invalid request');
            }

            const accessToken = generateAccessToken(account);
            const refreshToken = generateRefreshToken(account);
            if (account.refresh_token != refreshToken) {
                account.refresh_token = refreshToken;
                await account.save();
            }
            res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
        } catch (err) {
            return helpers.sendError(res, 400, err.message);
        }
    })
}

const update = async (req, res) => {
    try {
        await Account.updateOne({ _id: req.body._id }, req.body, { multi: true });
        res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }

}


const getRegister = async (req, res) => {
    res.send("//TODO: implement register page");
}

const getLogin = async (req, res) => {
    res.send("//TODO: implement login page");
}

const getLogout = async (req, res) => {
    res.send("//TODO: implement logout page");
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
    refreshToken,
    update,
    getRegister,
    getLogin,
    getLogout
}