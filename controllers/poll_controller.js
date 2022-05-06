const SCHEMA = "Poll";
const Poll = require('../models/poll_model');
const Account = require('../models/account_model');
const Answer = require('../models/answer_model');
const handleErrors = require("../common/helpers");
const helpers = require("../common/helpers");
const constants = require("../common/constants");

const create = async (req, res) => {
    const pollName = req.body.pollName;
    const accountId = req.body.accountId;
    const gender = req.body.gender;
    const maritalStatus = req.body.maritalStatus;
    const numberOfChildrens = req.body.numberOfChildrens;
    const permanentJob = req.body.permanentJob;
    const individualIncome = req.body.individualIncome;
    try {
        newPoll = await Poll.create({ pollName: pollName, accountId: accountId, gender: gender, maritalStatus: maritalStatus, numberOfChildrens: numberOfChildrens, permanentJob: permanentJob , individualIncome: individualIncome});
        return res.status(200).send({_id: newPoll._id});

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
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
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }
}

const getPollsByClientId = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        const polls = await Poll.find({accountId: accountId});
        return res.status(200).send(polls);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }
}

const getPollsByUserId = async (req, res) => { 
    const accountId = req.params.accountId;
    try {
        var matchedPolls = [];
        const account = await Account.findOne({_id: accountId, role: constants.USER});
        if (!account) return helpers.sendError(res, 400, 'account not found')
        const polls = await Poll.find({ gender : {$in: [account.gender]}});
        const answers = await Answer.find({ accountId : account._id});
        for (const poll of polls){
            var filledPoll = false;
            for(const answer of answers){
                if (poll._id == answer.pollId){
                    filledPoll = true;
                    break;
                }
            }
            if(!filledPoll){
            matchedPolls.push(poll);
            }
        }

        return res.status(200).send(matchedPolls);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
        return res.status(400).json({ erros });
    }
}

const update = async (req, res) => {
    try {
        const updatedPoll = await Poll.findOneAndUpdate({ _id: req.body._id }, req.body, { returnOriginal: false, runValidators: true  });
        return res.status(200).send(updatedPoll);

    } catch (err) {
        const erros = helpers.handleErrors(SCHEMA, err);
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