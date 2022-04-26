const SCHEMA = "Poll";
const Poll = require('../models/poll_model');
const handleErrors = require("../common/helpers");
const helpers = require("../common/helpers");

const create = async (req, res) => {
    const name = req.body.pollName;
    try {
        newPoll = await Poll.create({ pollName: name});
        res.status(200).send({_id: newPoll._id});

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement poll create page");
}


const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.status(200).send(polls);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}


module.exports = {
    create,
    getCreate,
    getAllPolls
}