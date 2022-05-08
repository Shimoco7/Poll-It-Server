const SCHEMA = "Account"
const Account = require('../models/account_model');
const jwt = require('jsonwebtoken');
const helpers = require("../common/helpers");
const constants = require('../common/constants');
const bcryptjs = require('bcryptjs');

const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const name = req.body.name;
    const address = req.body.address;
    const gender = req.body.gender;
    try {
        const newAccount = await Account.create({ email: email, password: password, role: role, name: name, address: address, gender: gender });
        return res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
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
        if (account.refreshToken != refreshToken) {
            account.refreshToken = refreshToken;
            await account.save();
        }
        if (account.role == constants.USER) {
            if (account.name == null || account.address == null || account.gender == null) {
                detailsFilled = false;
            }
        }

        return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, account: account, detailsFilled: detailsFilled });

    } catch (err) {
        return helpers.sendError(res, 400, err.message)
    }

}

const logout = async (req, res) => {
    const token = req.body.refreshToken;
    if (token == null) return helpers.sendError(res, 401, 'No refresh token')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, accountInfo) => {

        if (err) return helpers.sendError(res, 403, err.message)
        const accountId = accountInfo._id;
        try {
            const account = await Account.findById(accountId)
            if (account == null) return helpers.sendError(res, 403, 'Invalid request')
            if (account.refreshToken != token) {
                account.refreshToken = undefined;
                await account.save();
                return helpers.sendError(res, 403, 'invalid request')
            }
            account.refreshToken = undefined;
            await account.save();
            return res.status(200).send();
        } catch (err) {
            return helpers.sendError(res, 400, err.message)
        }
    })

}

const refreshToken = async (req, res) => {
    const token = req.body.refreshToken;
    if (token == null) return helpers.sendError(res, 401, 'No refresh token')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, accountInfo) => {

        if (err) return helpers.sendError(res, 403, err.message)
        const accountId = accountInfo._id;
        try {
            const account = await Account.findById(accountId)
            if (account == null) return helpers.sendError(res, 403, 'Invalid request');
            if (account.refreshToken != token) {
                account.refreshToken = undefined;
                await account.save();
                return helpers.sendError(res, 403, 'Invalid request');
            }

            const accessToken = generateAccessToken(account);
            const refreshToken = generateRefreshToken(account);
            if (account.refreshToken != refreshToken) {
                account.refreshToken = refreshToken;
                await account.save();
            }
            return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (err) {
            return helpers.sendError(res, 400, err.message);
        }
    })
}

const update = async (req, res) => {
    try {
        const updatedAccount = await Account.findOneAndUpdate({ _id: req.body._id }, req.body, { returnOriginal: false, runValidators: true });
        return res.status(200).send(updatedAccount);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }

}

const updatePassword = async (req, res) => {
    const accountId = req.body._id
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    try {
        const account = await Account.findOne({ _id: accountId });
        if (account == null) return helpers.sendError(res, 400, "Account was not found")
        if (oldPassword == null) return helpers.sendError(res, 400, "Missing old password")
        const match = await bcryptjs.compare(oldPassword, account.password)
        if (!match) return helpers.sendError(res, 400, "Incorrect old password")


        if (newPassword) {
            const updatedAccount = await Account.findOneAndUpdate({ _id: req.body._id }, {password: newPassword}, { runValidators: true });
        }
        return res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }

}


const facebook = async (req, res) => {
    var detailsFilled = true;
    const email = req.body.email;
    const name = req.body.name;
    const facebookId = req.body.facebookId;
    const role = req.body.role;
    const profilePicUrl = req.body.profilePicUrl;
    try {
        if(!facebookId || !email || facebookId == "" || email == "") return helpers.sendError(res, 400, "Missing email or facebookId")
        const account = await Account.findOne({ email: email });
        if(!account){
            await Account.create({ email: email, password: process.env.FB_PASSWORD , name: name, facebookId: facebookId, role: role, profilePicUrl: profilePicUrl});
        }
        if(account && !account.facebookId){
            return helpers.sendError(res, 400, "There's already an account associated with your email")
        }
        const loggedAccount = await Account.facebookLogin(email);
        const accessToken = generateAccessToken(loggedAccount);
        const refreshToken = generateRefreshToken(loggedAccount);
        if (loggedAccount.refreshToken != refreshToken) {
            loggedAccount.refreshToken = refreshToken;
            await loggedAccount.save();
        }
        if (loggedAccount.role == constants.USER) {
            if (loggedAccount.name == null || loggedAccount.address == null || loggedAccount.gender == null) {
                detailsFilled = false;
            }
        }

        return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, account: loggedAccount, detailsFilled: detailsFilled });

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }

}


const getRegister = async (req, res) => {
    return res.send("//TODO: implement register page");
}

const getLogin = async (req, res) => {
    return res.send("//TODO: implement login page");
}

const getLogout = async (req, res) => {
    return res.send("//TODO: implement logout page");
}

const getAccountById = async (req, res) => {
    const accountId = req.params._id;
    try {
        const account = await Account.findOne({ _id: accountId });
        return res.status(200).send(account);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }
}

function generateAccessToken(account) {
    return jwt.sign(
        { _id: account._id, role: account.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    )
}

function generateRefreshToken(account) {
    return jwt.sign(
        { _id: account._id, role: account.role },
        process.env.REFRESH_TOKEN_SECRET
    )
}

module.exports = {
    login,
    register,
    logout,
    refreshToken,
    update,
    updatePassword,
    getRegister,
    getLogin,
    getLogout,
    getAccountById,
    facebook
}