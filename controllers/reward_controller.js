const Account = require('../models/account_model');
const Reward = require('../models/reward_model');
const helpers = require("../common/helpers");
const constants = require('../common/constants');

const create = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    try {
        const newReward = await Reward.create({ title: title, description: description, price: price});
        return res.status(200).send({ _id: newReward._id });

    } catch (err) {
        const erros = helpers.handleErrors(constants.REWARD, err);
        return res.status(400).json({ erros });
    }
}

const getCreate = async (req, res) => {
    return res.send("//TODO: implement reward create page");
}


const getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.find();
        return res.status(200).send(rewards);

    } catch (err) {
        const erros = helpers.handleErrors(constants.REWARD, err);
        return res.status(400).json({ erros });
    }
}

const update = async (req, res) => {
    try {
        const updatedReward = await Reward.findOneAndUpdate({ _id: req.body._id }, req.body, { returnOriginal: false, runValidators: true });
        return res.status(200).send(updatedReward);

    } catch (err) {
        const erros = helpers.handleErrors(constants.REWARD, err);
        return res.status(400).json({ erros });
    }

}
module.exports = {
    create,
    getCreate,
    getAllRewards,
    update
}