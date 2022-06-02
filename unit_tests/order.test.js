const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const Order = require('../models/order_model');

const constants = require("../common/constants");

beforeAll(done => {
    console.log("\x1b[35m", "*******************Reward API Tests*******************");
    Account.deleteOne({
        email: constants.TEST_EMAIL
    }, (err) => {
        done();
    });
    Order.deleteOne({ rewardId: constants.TEST_ID2 }, (err) => {
        done();
    });
});

afterAll(done => {
    Account.deleteOne({
        email: constants.TEST_EMAIL
    }, (err) => {
        done();
    });
    Order.deleteOne({ rewardId: constants.TEST_ID2 }, (err) => {
        mongoose.connection.close();
        done();
    });
});

describe('Testing Reward API', () => {
    var accessToken;
    var accountId;

    test('Test getOrderById', async () => {
        console.log("\x1b[34m", "Starting Test: getOrderById...");
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD,
            role: constants.USER
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        accessToken = loginResult.body.accessToken;
        accountId = loginResult.body.account._id;
        const order = await Order.create({accountId: accountId, rewardId: constants.TEST_ID2, title:constants.TEST_QUESTION})
        const response = await request(app).get('/order/getOrderById/' + order._id).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.title).toEqual(constants.TEST_QUESTION);
        console.log("\x1b[34m", "Finishing Test: getOrderById...");
    });

    test('Test getOrdersByAccountId', async () => {
        console.log("\x1b[34m", "Starting Test: getOrdersByAccountId...");
        const response = await request(app).get('/order/getOrdersByAccountId/' + accountId).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.body.length).toEqual(1);
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: getOrdersByAccountId...");
    });
})