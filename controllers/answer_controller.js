const SCHEMA = "Answer";
const Answer = require('../models/answer_model');
const helpers = require("../common/helpers");

const create = async (req, res) => {
    const answer = req.body.answer;
    const pollId = req.body.pollId;
    const pollQuestionId = req.body.pollQuestionId;
    const userId = req.body.accountId;
    try {
        const newAnswer = await Answer.create({ "answer": answer, "pollId": pollId, "pollQuestionId": pollQuestionId, "accountId": userId });
        res.status(200).send({ "_id": newAnswer._id });

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