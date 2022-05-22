const jwt = require('jsonwebtoken');
const fs = require('fs');
const request = require('request');
const handleErrors = (schema, err) => {
    let errors = {};
    if (err.code === 11000) {
        errors[Object.keys(err.keyPattern)] = "already exist";
    }
    else if (err.message.includes(schema + " validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            if (properties) {
                errors[properties.path] = properties.message;
            }
            else {
                errors.error = err.message
            }
        });
    }
    else {
        errors.error = err.message
    }
    return errors;
}

const sendError = (res, code, msg) => {
    return res.status(code).json({
        'status': 'fail',
        'error': msg
    })
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

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


module.exports = {
    handleErrors,
    sendError,
    generateAccessToken,
    generateRefreshToken,
    download
}