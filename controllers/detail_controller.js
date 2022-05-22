const Detail = require('../models/detail_model');
const DetailQuestion = require('../models/detail_question_model');
const Account = require('../models/account_model');
const helpers = require("../common/helpers");
const constants = require("../common/constants");
const { ObjectId } = require('mongodb');

const create = async (req, res) => {
    const detailId = req.body._id;
    const answer = req.body.answer;
    const question = req.body.question;
    const questionId = req.body.questionId;
    const accountId = req.body.accountId;
    try {
        const account = await Account.findOne({ _id: accountId });
        if (!account) return helpers.sendError(res, 400, constants.ACCOUNT + ' not found')
        const detailQuestion = await DetailQuestion.findOne({ _id: questionId });
        if (!detailQuestion) return helpers.sendError(res, 400, constants.DETAIL_QUESTION + ' not found')
        const newDetail = await Detail.findOneAndUpdate({ _id: new ObjectId(detailId) }, { answer: answer, question: question, questionId: questionId, accountId: accountId }, { upsert: true, runValidators: true });
        return res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(constants.DETAIL, err);
        return res.status(400).json({ erros });
    }
}

const getDetailsByAccountId = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        const details = await Detail.find({ accountId: accountId });
        return res.status(200).send(details);

    } catch (err) {
        const erros = helpers.handleErrors(constants.DETAIL, err);
        return res.status(400).json({ erros });
    }
}

module.exports = {
    create,
    getDetailsByAccountId
}