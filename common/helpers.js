
const handleErrors = (schema, err) => {
    let errors = {};
    if (err.code === 11000) {
        errors[Object.keys(err.keyPattern)] = "already exist";
    }
    if (err.message.includes(schema+" validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    else{
        errors.error =  err.message
    }
    return errors;
}

const sendError = (res, code, msg) => {
    return res.status(code).json({
        'status': 'fail',
        'error': msg
    })
}

module.exports = {
    handleErrors,
    sendError
}