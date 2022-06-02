const Order = require('../models/order_model');
const helpers = require("../common/helpers");
const constants = require("../common/constants");

const getOrderById = async (req, res) => {
    const orderId = req.params._id;
    try {
        const order = await Order.findOne({ _id: orderId });
        return res.status(200).send(order);

    } catch (err) {
        const erros = helpers.handleErrors(constants.ORDER, err);
        return res.status(400).json({ erros });
    }
}

const getOrdersByAccountId = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        const orders = await Order.find({ accountId: accountId });
        return res.status(200).send(orders);

    } catch (err) {
        const erros = helpers.handleErrors(constants.ORDER, err);
        return res.status(400).json({ erros });
    }
}


module.exports = {
    getOrderById,
    getOrdersByAccountId
}