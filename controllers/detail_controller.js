const SCHEMA = "Detail";
const Detail = require('../models/detail_model');
const helpers = require("../common/helpers");
const { ObjectId } = require('mongodb');
const create = async (req, res) => {
    const detailId = req.body._id;
    const answer = req.body.answer;
    const question = req.body.question;
    const questionId = req.body.questionId;
    const accountId = req.body.accountId;
    try {
        const newDetail = await Detail.findOneAndUpdate({ "_id": new ObjectId(detailId)},{"answer": answer, "question": question, "questionId":questionId, "accountId": accountId}, { upsert: true});
        res.status(200).send();

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const getDetailsByAccountId = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        const details = await Detail.find({"accountId": accountId});
        res.status(200).send(details);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

module.exports = {
    create,
    getDetailsByAccountId
}