const Answer = require('../models/answer_model')

const handleErrors = (err) => {
    let errors = {};

    if (err.message.includes("Answer validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const create = async (req, res) => {
    const answer = req.body.answer;
    const pollId = req.body.poll_id;
    const pollQuestionId = req.body.poll_question_id;
    const userId = req.body.user_id;
    try {
        const newAnswer = await Answer.create({"answer": answer, "poll_id": pollId, "poll_question_id": pollQuestionId, "user_id": userId});
        res.status(200).send({"_id":newAnswer._id});

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement answer create page");
}


module.exports = {
    create,
    getCreate
}