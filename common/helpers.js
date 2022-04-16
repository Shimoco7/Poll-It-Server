
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
    return errors;
}

module.exports = handleErrors