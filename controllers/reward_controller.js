const Account = require('../models/account_model');
const Reward = require('../models/reward_model');
const Order = require('../models/order_model');
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
        const rewards = await Reward.find().sort([["price", 1]]).exec();
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
    const amount = req.body.amount;
    if (!accountId || !rewardId) return helpers.sendError(res, 401, 'No accountId or rewardId')
    if (!amount){amount = 1;}
    try {
        var account = await Account.findOne({ _id: accountId, role: constants.USER });
        if (!account) return helpers.sendError(res, 400, constants.ACCOUNT + ' not found')
        const reward = await Reward.findOne({ _id: rewardId });
        if (!reward) return helpers.sendError(res, 400, constants.REWARD + ' not found')
        if (account.coins < reward.price*amount) return helpers.sendError(res, 400, constants.ACCOUNT + ' coins: ' + account.coins + ', ' + constants.REWARD + "s price: " + reward.price*amount)
        else {
            const curDate = Math.floor(Date.now() / 1000);
            const expirationDate = Math.floor((Date.now() + 365*24*60*60000 )/ 1000);
            for (var i=0; i<amount; ++i) {
                const order = await Order.create({ rewardId: rewardId,accountId:accountId, title: reward.title, supplierImage: reward.supplierImage, purchaseDate: curDate, expirationDate: expirationDate})
                account = await Account.findOneAndUpdate({ _id: accountId }, { $inc:{coins : -reward.price}, $push: { orders: order._id} }, { returnOriginal: false}).populate('orders');
                if (!reward.orders.includes(order._id)) {
                    await Reward.findOneAndUpdate({ _id: rewardId },{$addToSet : { orders: order._id} });
                }
            }  
            return res.status(200).send(account);
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