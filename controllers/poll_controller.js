const Poll = require('../models/poll_model');
const Account = require('../models/account_model');
const Detail = require('../models/detail_model');
const helpers = require("../common/helpers");
const constants = require("../common/constants");
const { ObjectId } = require('mongodb');

const create = async (req, res) => {
    const pollId = req.body._id;
    const pollName = req.body.pollName;
    const accountId = req.body.accountId;
    const image = req.body.image;
    const coins = req.body.coins;
    const maxUsers = req.body.maxUsers;
    const pollQuestions = req.body.pollQuestions;
    const age = req.body.age;
    const gender = req.body.gender;
    const educationLevel = req.body.educationLevel;
    const maritalStatus = req.body.maritalStatus;
    const numberOfChildrens = req.body.numberOfChildrens;
    const permanentJob = req.body.permanentJob;
    const income = req.body.income;
    try {
        const account = await Account.findOne({ _id: accountId, role: constants.CLIENT });
        if (!account) return helpers.sendError(res, 400, constants.ACCOUNT + ' not found')
        const newPoll = await Poll.findOneAndUpdate({ _id: new ObjectId(pollId) }, {pollName: pollName, accountId: accountId, image: image, coins: coins, maxUsers: maxUsers, pollQuestions: pollQuestions, age: age, gender: gender, educationLevel: educationLevel, maritalStatus: maritalStatus, numberOfChildrens: numberOfChildrens, permanentJob: permanentJob, income: income  }, { upsert: true, runValidators: true, returnOriginal: false });
        if (!account.polls.includes(newPoll._id)) {
            await Account.findOneAndUpdate({ _id: accountId },{$addToSet : { polls: newPoll._id } });
        }
        return res.status(200).send({ _id: newPoll._id });

    } catch (err) {
        const erros = helpers.handleErrors(constants.POLL, err);
        return res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    return res.send("//TODO: implement poll create page");
}


const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        return res.status(200).send(polls);

    } catch (err) {
        const erros = helpers.handleErrors(constants.POLL, err);
        return res.status(400).json({ erros });
    }
}

const getPollsByClientId = async (req, res) => {
    const accountId = req.params.accountId;
    const account = await Account.findOne({ _id: accountId, role: constants.CLIENT }).populate('polls');
    if (!account) return helpers.sendError(res, 400, constants.ACCOUNT + ' not found')
    try {
        return res.status(200).send(account.polls);
    } catch (err) {
        const erros = helpers.handleErrors(constants.POLL, err);
        return res.status(400).json({ erros });
    }
}

const getPollsByUserId = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        var detailsMap = {};
        const account = await Account.findOne({ _id: accountId, role: constants.USER }).populate('details');
        if (!account) return helpers.sendError(res, 400, constants.ACCOUNT + ' not found')
        for (const detail of account.details) {
            detailsMap[constants.DETAIL_QUESTION_MAP[detail.question]] = detail.answer;
        }
        const polls = await Poll.find({
            disabled: false,
            users: { $nin: accountId },
            age: { $in: [detailsMap[constants.AGE]] },
            educationLevel: { $in: [detailsMap[constants.EDUCATION_LEVEL]] },
            gender: { $in: [detailsMap[constants.GENDER]] },
            maritalStatus: { $in: [detailsMap[constants.MARITAL_STATUS]] },
            numberOfChildrens: { $in: [detailsMap[constants.NUMBER_OF_CHILDRENS]] },
            permanentJob: { $in: [detailsMap[constants.PERMANENT_JOB]] },
            income: { $in: [detailsMap[constants.INCOME]] },
        });
        return res.status(200).send(polls);
    } catch (err) {
        const erros = helpers.handleErrors(constants.POLL, err);
        return res.status(400).json({ erros });
    }
}

const update = async (req, res) => {
    try {
        const updatedPoll = await Poll.findOneAndUpdate({ _id: req.body._id }, req.body, { returnOriginal: false, runValidators: true });
        return res.status(200).send(updatedPoll);

    } catch (err) {
        const erros = helpers.handleErrors(constants.POLL, err);
        return res.status(400).json({ erros });
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