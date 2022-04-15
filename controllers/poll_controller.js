const Poll = require('../models/poll_model')

const handleErrors = (err) => {
    let errors = {};

    if (err.message.includes("Poll validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const create = async (req, res) => {
    const name = req.body.poll_name;
    try {
        newPoll = await Poll.create({ "poll_name": name});
        res.status(200).send({"_id":newPoll._id});

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement poll create page");
}


module.exports = {
    create,
    getCreate
}