const SCHEMA = "Question";
const Question = require('../models/question_model');
const helpers = require("../common/helpers");

const create = async (req, res) => {
    const question = req.body.question;
    const multiChoice = req.body.multi_choice;
    try {
        const newQuestion = await Question.create({"question": question, "multi_choice": multiChoice});
        res.status(200).send({"_id":newQuestion._id});

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement question create page");
}

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).send(questions);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        res.status(400).json({ erros });
    }
}


module.exports = {
    create,
    getCreate,
    getAllQuestions
}