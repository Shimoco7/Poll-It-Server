const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const Reward = require('../models/reward_model');
const Order = require('../models/order_model');

const constants = require("../common/constants");

beforeAll(done => {
    console.log("\x1b[35m", "*******************Reward API Tests*******************");
    Account.deleteMany({
        email: {
            $in: [
                constants.TEST_EMAIL,
                constants.TEST_EMAIL2
            ]
        }
    }, (err) => {
        done();
    });
    Reward.deleteOne({ title: constants.TEST_REWARD_TITLE }, (err) => {
        done();
    });
});

afterAll(done => {
    Account.deleteMany({
        email: {
            $in: [
                constants.TEST_EMAIL,
                constants.TEST_EMAIL2
            ]
        }
    }, (err) => {
        done();
    });
    Reward.deleteOne({ title: constants.TEST_REWARD_TITLE }, (err) => {
        mongoose.connection.close();
        done();
    });
});

describe('Testing Reward API', () => {
    var accessToken;
    var accountId;
    var rewardId;

    test('Test getOrderById', async () => {
        console.log("\x1b[34m", "Starting Test: createReward...");
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
        console.log("\x1b[34m", "Starting Test: getOrderById...");
        const response = await request(app).get('/order/getOrderById/' + constants.TEST_ID).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: getOrderById...");
    });

    test('Test getOrdersByAccountId', async () => {
        console.log("\x1b[34m", "Starting Test: getOrdersByAccountId...");
        const response = await request(app).get('/order/getOrdersByAccountId/' + accountId).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: getOrdersByAccountId...");
    });
})