const Answer = require('../models/answer_model');
const Account = require('../models/account_model');
const Poll = require('../models/poll_model');
const PollQuestion = require('../models/poll_question_model');
const helpers = require("../common/helpers");
const constants = require("../common/constants");
const { ObjectId } = require('mongodb');

const create = async (req, res) => {
    const answerId = req.body._id;
    const answer = req.body.answer;
    const pollId = req.body.pollId;
    const pollQuestionId = req.body.pollQuestionId;
    const accountId = req.body.accountId;
    try {
        const account = await Account.findOne({ _id: accountId, role: constants.USER });
        if (!account) return helpers.sendError(res, 400, constants.ACCOUNT + ' not found')
        const poll = await Poll.findOne({ _id: pollId });
        if (!poll) return helpers.sendError(res, 400, constants.POLL + ' not found')
        if (poll.disabled) return helpers.sendError(res, 400, constants.POLL + ' is disabled')
        const pollQuestion = await PollQuestion.findOne({ _id: pollQuestionId });
        if (!pollQuestion) return helpers.sendError(res, 400, constants.POLL_QUESTION + ' not found')
        const accountsFilledPoll = await Account.find({ role: constants.USER, polls: pollId });
        if (!account.polls.includes(pollId) && accountsFilledPoll.length >= poll.maxUsers) {
            poll.disabled = true;
            await poll.save();
            return helpers.sendError(res, 400, constants.POLL + ' is no longer available due to max size of users');
        }
        const newAnswer = await Answer.findOneAndUpdate({ _id: new ObjectId(answerId) }, { answer: answer, pollId: pollId, pollQuestionId: pollQuestionId, accountId: accountId }, { upsert: true, runValidators: true, returnOriginal: false });
        if (!pollQuestion.answers.includes(newAnswer._id)) {
            await PollQuestion.findOneAndUpdate({ _id: pollQuestionId }, { '$push': { answers: newAnswer._id } });
        }
        if (!account.polls.includes(pollId)) {
            await Account.findOneAndUpdate({ _id: accountId }, { '$push': { polls: pollId } });
        }
        if (accountsFilledPoll.length == poll.maxUsers) {
            poll.disabled = true;
            await poll.save();
        }
        const answers = await Answer.find({ accountId: accountId, pollQuestionId: pollQuestionId });
        const accountsFilledPoll2 = await Account.find({ role: constants.USER, polls: pollId });
        if (accountsFilledPoll2.length >= poll.maxUsers && answers.length >= poll.pollQuestions.length) {
            poll.disabled = true;
            await poll.save();
        }
        return res.status(200).send({ _id: newAnswer._id });

    } catch (err) {
        const erros = helpers.handleErrors(constants.ANSWER, err);
        return res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    return res.send("//TODO: implement answer create page");
}

const getAnswerById = async (req, res) => {
    const answerId = req.params._id;
    try {
        const answer = await Answer.findOne({ _id: answerId });
        return res.status(200).send(answer);

    } catch (err) {
        const erros = helpers.handleErrors(constants.ANSWER, err);
        return res.status(400).json({ erros });
    }
}

const getAnswersByPollId = async (req, res) => {
    const pollId = req.params.pollId;
    try {
        const answers = await Answer.find({ pollId: pollId });
        return res.status(200).send(answers);

    } catch (err) {
        const erros = helpers.handleErrors(constants.ANSWER, err);
        return res.status(400).json({ erros });
    }
}


const getAnswersByPollQuestionId = async (req, res) => {
    const pollQuestionId = req.params.pollQuestionId;
    try {
        const answers = await Answer.find({ pollQuestionId: pollQuestionId });
        return res.status(200).send(answers);

    } catch (err) {
        const erros = helpers.handleErrors(constants.ANSWER, err);
        return res.status(400).json({ erros });
    }
}

module.exports = {
    create,
    getCreate,
    getAnswerById,
    getAnswersByPollId,
    getAnswersByPollQuestionId
}