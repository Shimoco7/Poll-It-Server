const SCHEMA = "Answer";
const Answer = require('../models/answer_model');
const helpers = require("../common/helpers");
const { ObjectId } = require('mongodb');
const create = async (req, res) => {
    const answerId = req.body._id;
    const answer = req.body.answer;
    const pollId = req.body.pollId;
    const pollQuestionId = req.body.pollQuestionId;
    const accountId = req.body.accountId;
    try {
        const newAnswer = await Answer.findOneAndUpdate({ _id: new ObjectId(answerId)},{ answer: answer, pollId: pollId, pollQuestionId: pollQuestionId, accountId: accountId }, { upsert: true, runValidators: true  });
        return res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    return res.send("//TODO: implement answer create page");
}

const getAnswerById = async (req, res) => {
    const answerId = req.params._id;
    try {
        const answer = await Answer.findOne({_id: answerId});
        return res.status(200).send(answer);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }
}

const getAnswersByPollId = async (req, res) => {
    const pollId = req.params.pollId;
    try {
        const answers = await Answer.find({pollId: pollId});
        return res.status(200).send(answers);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }
}


module.exports = {
    create,
    getCreate,
    getAnswerById,
    getAnswersByPollId
}