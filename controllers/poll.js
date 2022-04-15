const Poll = require('../models/poll_model')

const sendError = (res, code, msg) => {
    if (msg.code === 11000){
        msg = "Poll name already exists"
    }
    return res.status(code).json({
        'status': 'fail',
        'error': msg
    })
}

const create = async (req, res) => {
    const name = req.body.poll_name;
    try {
        newPoll = await Poll.create({ "poll_name": name});
        res.status(200).send({"_id":newPoll._id});

    } catch (err) {
        return sendError(res, 400, err);
    }
}


module.exports = {
    create
}