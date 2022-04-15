const Question = require('../models/question_model')

const handleErrors = (err) => {
    let errors = {};

    if (err.message.includes("Question validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const create = async (req, res) => {
    const question = req.body.question;
    const multiChoice = req.body.multi_choice;
    try {
        const newQuestion = await Question.create({"question": question, "multi_choice": multiChoice});
        res.status(200).send({"_id":newQuestion._id});

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement question create page");
}


module.exports = {
    create,
    getCreate
}