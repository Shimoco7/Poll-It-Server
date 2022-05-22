const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const Reward = require('../models/reward_model');

const constants = require("../common/constants");

beforeAll(done => {
    console.log("\x1b[35m", "*******************Reward API Tests*******************");
    Account.deleteOne({ email: constants.TEST_EMAIL }, (err) => {
        done();
    });
    Reward.deleteOne({ title: constants.TEST_REWARD_TITLE }, (err) => {
        done();
    });
});

afterAll(done => {
    Account.deleteOne({ email: constants.TEST_EMAIL }, (err) => {
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

    test('Test createReward', async () => {
        console.log("\x1b[34m", "Starting Test: createReward...");
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD,
            role: constants.ADMIN
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        accessToken = loginResult.body.accessToken;
        accountId = loginResult.body.account._id;
        const response = await request(app).post('/reward/create').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            title: constants.TEST_REWARD_TITLE,
            price: constants.TEST_REWARD_PRICE,
            description: constants.TEST_REWARD_DESCRIPTION
        });
        expect(response.statusCode).toEqual(200);
        rewardId = response.body._id;
        console.log("\x1b[34m", "Finishing Test: createReward...");
    })

    test('Test rewardUpdate', async () => {
        console.log("\x1b[34m", "Starting Test: rewardUpdate...");
        const response = await request(app).put('/reward/update').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: rewardId,
            supplier: "supplier"
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: rewardUpdate...");
    });

    test('Test getAllRewards', async () => {
        console.log("\x1b[34m", "Starting Test: getAllRewards...");
        const response = await request(app).get('/reward/getAllRewards').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        console.log("\x1b[34m", "Finishing Test: getAllRewards...");
    });
    test('Test redeemReward', async () => {
        const response = await request(app).post('/reward/redeemReward').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            accountId: accountId,
            rewardId: rewardId
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: redeemReward...");
    });
})