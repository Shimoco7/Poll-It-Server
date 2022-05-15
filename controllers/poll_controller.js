const Poll = require('../models/poll_model');
const Account = require('../models/account_model');
const Answer = require('../models/answer_model');
const Detail = require('../models/detail_model');
const helpers = require("../common/helpers");
const constants = require("../common/constants");

const create = async (req, res) => {
    const pollName = req.body.pollName;
    const accountId = req.body.accountId;
    const pollQuestions = req.body.pollQuestions;
    const gender = req.body.gender;
    const age = req.body.age;
    const educationLevel = req.body.educationLevel;
    const maritalStatus = req.body.maritalStatus;
    const numberOfChildrens = req.body.numberOfChildrens;
    const permanentJob = req.body.permanentJob;
    const income = req.body.income;
    try {
        const account = await Account.findOne({ _id: accountId });
        if(!account) return helpers.sendError(res, 400, constants.ACCOUNT+' not found')
        const newPoll = await Poll.create({ pollName: pollName, accountId: accountId,pollQuestions: pollQuestions, gender: gender, maritalStatus: maritalStatus, numberOfChildrens: numberOfChildrens, permanentJob: permanentJob, income: income, age: age, educationLevel: educationLevel });
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
    try {
        const polls = await Poll.find({ accountId: accountId });
        return res.status(200).send(polls);

    } catch (err) {
        const erros = helpers.handleErrors(constants.POLL, err);
        return res.status(400).json({ erros });
    }
}

const getPollsByUserId = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        var matchedPolls = [];
        var detailsMap = {};
        const account = await Account.findOne({ _id: accountId, role: constants.USER });
        if (!account) return helpers.sendError(res, 400, constants.ACCOUNT+' not found')
        const details = await Detail.find({ accountId: account._id });
        for (const detail of details) {
            detailsMap[constants.DETAIL_QUESTION_MAP[detail.question]] = detail.answer;
        }
        const polls = await Poll.find({
            age: { $in: [detailsMap[constants.AGE]] },
            educationLevel: { $in: [detailsMap[constants.EDUCATION_LEVEL]] },
            gender: { $in: [detailsMap[constants.GENDER]] },
            maritalStatus: { $in: [detailsMap[constants.MARITAL_STATUS]] },
            numberOfChildrens: { $in: [detailsMap[constants.NUMBER_OF_CHILDRENS]] },
            permanentJob: { $in: [detailsMap[constants.PERMANENT_JOB]] },
            income: { $in: [detailsMap[constants.INCOME]] },
        });
        const answers = await Answer.find({ accountId: account._id });
        for (const poll of polls) {
            var filledPoll = false;
            for (const answer of answers) {
                if (poll._id == answer.pollId) {
                    filledPoll = true;
                    break;
                }
            }
            if (!filledPoll) {
                matchedPolls.push(poll);
            }
        }

        return res.status(200).send(matchedPolls);

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