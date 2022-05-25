const Account = require('../models/account_model');
const Reward = require('../models/reward_model');
const helpers = require("../common/helpers");
const constants = require('../common/constants');

const create = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const supplier = req.body.supplier;
    const supplierImage = req.body.supplierImage;

    try {
        const newReward = await Reward.create({ title: title, description: description, price: price, image: image, supplier: supplier, supplierImage: supplierImage });
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

const redeemReward = async (req, res) => {
    const accountId = req.body.accountId;
    const rewardId = req.body.rewardId;
    if (accountId == null || rewardId == null) return helpers.sendError(res, 401, 'No accountId or rewardId')
    try {
        const account = await Account.findOne({ _id: accountId, role: constants.USER });
        if (!account) return helpers.sendError(res, 400, constants.ACCOUNT + ' not found')
        const reward = await Reward.findOne({ _id: rewardId });
        if (!reward) return helpers.sendError(res, 400, constants.REWARD + ' not found')
        if (account.coins < reward.price) return helpers.sendError(res, 400, constants.ACCOUNT + ' coins: ' + account.coins + ', ' + constants.REWARD + " price: " + reward.price)
        else {
            var objIndex = account.rewards.findIndex((obj => obj._id == rewardId));
            var curDate = Math.floor(Date.now() / 1000);
            if (!account.rewards) {
                account.rewards = [{ _id: rewardId, ammount: 1, purchaseDate: curDate }]
            }
            else if (objIndex === -1) {
                account.rewards.push({ _id: rewardId, ammount: 1, purchaseDate: curDate })
            }
            else {
                account.rewards[objIndex].ammount = account.rewards[objIndex].ammount + 1;
                account.rewards[objIndex].purchaseDate = curDate;
            }
            account.coins = account.coins - reward.price;
            await account.save();
            if (!reward.accounts.includes(accountId)) {
                await Reward.findOneAndUpdate({ _id: rewardId },{$addToSet : { accounts: accountId} });
            }
            return res.status(200).send({ account });
        }

    } catch (err) {
        const erros = helpers.handleErrors(constants.REWARD, err);
        return res.status(400).json({ erros });
    }
}


module.exports = {
    create,
    getCreate,
    getAllRewards,
    update,
    redeemReward
}