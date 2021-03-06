const jwt = require('jsonwebtoken');
const helpers = require("./helpers");


const authenticate = roles => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return helpers.sendError(res, 401, 'No access token')

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
            if (err) return helpers.sendError(res, 403, 'Invalid request')
            if (!roles || !roles.includes(account.role)) return helpers.sendError(res, 403, 'Invalid request')
            req.account = account;
            next();
        })
    }
}

module.exports = authenticate