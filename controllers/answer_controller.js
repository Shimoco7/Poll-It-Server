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
        res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement answer create page");
}


module.exports = {
    create,
    getCreate
}