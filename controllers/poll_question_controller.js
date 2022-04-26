const SCHEMA = "PollQuestion";
const PollQuestion = require('../models/poll_question_model');
const helpers = require("../common/helpers");

const create = async (req, res) => {
    const pollQuestion = req.body.pollQuestion;
    const pollQuestionType = req.body.pollQuestionType;
    const pollQuestionImage = req.body.pollQuestionImage;
    const choices = req.body.choices;
    const pollId = req.body.pollId;
    try {
        newPollQuestion = await PollQuestion.create({pollQuestion: pollQuestion,pollQuestionType: pollQuestionType, choices: choices, pollId: pollId, pollQuestionImage: pollQuestionImage});
        res.status(200).send({_id: newPollQuestion._id});

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement poll question create page");
}

const getPollQuestionsByPollId = async (req, res) => {
    const pollId = req.params.pollId;
    try {
        const pollQuestions = await PollQuestion.find({pollId: pollId});
        res.status(200).send(pollQuestions);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

module.exports = {
    create,
    getCreate,
    getPollQuestionsByPollId
}