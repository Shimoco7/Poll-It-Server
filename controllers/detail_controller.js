const Detail = require('../models/detail_model')

const handleErrors = (err) => {
    let errors = {};

    if (err.message.includes("Detail validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const create = async (req, res) => {
    const answer = req.body.answer;
    const question = req.body.question;
    const questionId = req.body.question_id;
    const accountId = req.body.uid;
    try {
        const newDetail = await Detail.create({ "answer": answer, "question": question, "question_id":questionId, "uid": accountId});
        res.status(200).send({"_id":newDetail._id});

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ erros });
    }
}

const getDetailsByUid = async (req, res) => {
    const accountId = req.body.uid;
    try {
        const details = await Detail.find({"uid": accountId});
        res.status(200).send(details);

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ erros });
    }
}

module.exports = {
    create,
    getDetailsByUid
}