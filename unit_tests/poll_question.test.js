const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const PollQuestion = require('../models/poll_question_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************PollQuestion API Tests*******************");
    Account.deleteMany({email : {$in: [
        constants.TEST_EMAIL,
        constants.TEST_EMAIL2
      ]}}, (err)=>{
        done();
    });
    PollQuestion.deleteOne({pollQuestion: constants.TEST_QUESTION}, (err)=>{
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
    PollQuestion.deleteOne({pollQuestion: constants.TEST_QUESTION}, (err)=>{
        mongoose.connection.close();
        done();

    });


});
    describe('Testing PollQuestion API',()=>{
    var accessToken;
    var accountId;
    test('Test createPollQuestion',async ()=>{
        console.log("\x1b[34m", "Starting Test: createPollQuestion...");
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
        const response = await request(app).post('/poll_question/create').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            pollQuestion: constants.TEST_QUESTION,
            pollQuestionType: constants.TEST_POLL_QUESTION_TYPE,
            pollId: constants.TEST_ID


        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: createPollQuestion...");
    })

    test('Test getPollQuestionsByPollId',async ()=>{
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD
        });
        accessToken = loginResult.body.accessToken;
        console.log("\x1b[34m", "Starting Test: getPollQuestionsByPollId...");
        const response = await request(app).get('/poll_question/getPollQuestionsByPollId/'+constants.TEST_ID).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        console.log("\x1b[34m", "Finishing Test: getPollQuestionsByPollId...");
    });

});