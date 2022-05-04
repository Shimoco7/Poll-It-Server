const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const Poll = require('../models/poll_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************Poll API Tests*******************");
    Account.deleteMany({email : {$in: [
        constants.TEST_EMAIL,
        constants.TEST_EMAIL2
      ]}}, (err)=>{
        done();
    });
    Poll.deleteOne({pollName : constants.TEST_POLL_NAME}, (err)=>{
        done();
    });

});

afterAll(done=>{
    Account.deleteMany({email : {$in: [
        constants.TEST_EMAIL,
        constants.TEST_EMAIL2
      ]}}, (err)=>{
        done();
    });
    Poll.deleteOne({pollName : constants.TEST_POLL_NAME}, (err)=>{
        mongoose.connection.close();
        done();

    });

});

describe('Testing Poll API',()=>{
    var accessToken;
    var accountId;
    var pollId;
    test('Test createPoll',async ()=>{
        console.log("\x1b[34m", "Starting Test: createPoll...");
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD,
            role: constants.CLIENT
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });

        accessToken = loginResult.body.accessToken;
        accountId = loginResult.body.account._id;
        const response = await request(app).post('/poll/create').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            pollName: constants.TEST_POLL_NAME,
            accountId: accountId
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: createPoll...");
    })

    test('Test getPollsByClientId',async ()=>{
        console.log("\x1b[34m", "Starting Test: getPollsByClientId...");
        const response = await request(app).get('/poll/getPollsByClientId/'+accountId).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        pollId = response.body[0]._id;
        console.log("\x1b[34m", "Finishing Test: getPollsByClientId...");
    });

    test('Test pollUpdate',async ()=>{
        console.log("\x1b[34m", "Starting Test: pollUpdate...");
        const response = await request(app).post('/poll/update').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: pollId,
            gender: ['Male'],
            minAge: "10",
            maxAge: "20"
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.minAge).toEqual("10");
        console.log("\x1b[34m", "Finishing Test: pollUpdate...");
    });

    test('Test getAllPolls',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAllPolls...");
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD
        });
        accessToken = loginResult.body.accessToken;

        const response = await request(app).get('/poll/getAllPolls').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        console.log("\x1b[34m", "Finishing Test: getAllPolls...");
    });


});