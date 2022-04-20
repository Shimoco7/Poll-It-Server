const SCHEMA = "DetailQuestion";
const DetailQuestion = require('../models/detail_question_model');
const helpers = require("../common/helpers");

const create = async (req, res) => {
    const detailQuestion = req.body.detailQuestion;
    const choices = req.body.choices;
    try {
        const newDetailQuestion = await DetailQuestion.create({"detailQuestion": detailQuestion, "choices": choices});
        res.status(200).send({"_id":newDetailQuestion._id});

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement question create page");
}

const getAllDetailQuestions = async (req, res) => {
    try {
        const detailQuestions = await DetailQuestion.find();
        res.status(200).send(detailQuestions);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}


module.exports = {
    create,
    getCreate,
    getAllDetailQuestions
}