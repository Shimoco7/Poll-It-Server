const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const Answer = require('../models/answer_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************Answer API Tests*******************");
    Account.deleteMany({email : {$in: [
        constants.TEST_EMAIL,
        constants.TEST_EMAIL2
      ]}}, (err)=>{
        done();
    });
    Answer.deleteOne({_id: constants.TEST_ID}, (err)=>{
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
    Answer.deleteOne({answer : constants.TEST_ANSWER}, (err)=>{
        mongoose.connection.close();
        done();

    });


});
    describe('Testing Answer API',()=>{
    var accessToken;
    var accountId;
    test('Test createAnswer',async ()=>{
        console.log("\x1b[34m", "Starting Test: createAnswer...");
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });

        accessToken = loginResult.body.accessToken;
        accountId = loginResult.body.account._id;
        const response = await request(app).post('/answer/create').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: constants.TEST_ID,
            answer: constants.TEST_ANSWER,
            accountId: accountId,
            pollId: constants.TEST_ID2


        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: createAnswer...");
    })

    test('Test getAnswerById',async ()=>{
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD,
            role: constants.CLIENT
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD
        });
        accessToken = loginResult.body.accessToken;
        console.log("\x1b[34m", "Starting Test: getAnswerById...");
        const response = await request(app).get('/answer/getAnswerById/'+constants.TEST_ID).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.answer).toEqual(constants.TEST_ANSWER);
        console.log("\x1b[34m", "Finishing Test: getAnswerById...");
    });

    test('Test getAnswersByPollId',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAnswersByPollId...");
        const response = await request(app).get('/answer/getAnswersByPollId/'+constants.TEST_ID2).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        console.log("\x1b[34m", "Finishing Test: getAnswersByPollId...");
    });

    
    test('Test getAnswersByPollQuestionId',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAnswersByPollQuestionId...");
        const response = await request(app).get('/answer/getAnswersByPollQuestionId/'+constants.TEST_ID2).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: getAnswersByPollQuestionId...");
    });

});