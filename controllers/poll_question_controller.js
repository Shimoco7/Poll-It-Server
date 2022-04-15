const PollQuestion = require('../models/poll_question_model')

const handleErrors = (err) => {
    let errors = {};

    if (err.message.includes("PollQuestion validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const create = async (req, res) => {
    const pollQuestion = req.body.poll_question;
    const pollQuestionType = req.body.poll_question_type;
    const choices = req.body.choices;
    const pollId = req.body.poll_id;
    try {
        newPollQuestion = await PollQuestion.create({"poll_question": pollQuestion,"poll_question_type":pollQuestionType, "choices": choices, "poll_id": pollId});
        res.status(200).send({"_id":newPollQuestion._id});

    } catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    res.send("//TODO: implement poll question create page");
}


module.exports = {
    create,
    getCreate
}