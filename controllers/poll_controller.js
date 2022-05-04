const SCHEMA = "Poll";
const Poll = require('../models/poll_model');
const handleErrors = require("../common/helpers");
const helpers = require("../common/helpers");

const create = async (req, res) => {
    const pollName = req.body.pollName;
    const accountId = req.body.accountId;
    try {
        newPoll = await Poll.create({ pollName: pollName, accountId: accountId});
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

const getPollsByClientId = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        const polls = await Poll.find({accountId: accountId});
        res.status(200).send(polls);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const getPollsByUserId = async (req, res) => { //TODO: query polls according to sample group
    const accountId = req.params.accountId;
    try {
        const polls = await Poll.find({});
        res.status(200).send(polls);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const update = async (req, res) => {
    try {
        const updatedPoll = await Poll.findOneAndUpdate({ _id: req.body._id }, req.body, { returnOriginal: false, runValidators: true  });
        res.status(200).send(updatedPoll);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }

}
module.exports = {
    create,
    getCreate,
    getAllPolls,
    getPollsByClientId,
    getPollsByUserId,
    update
}