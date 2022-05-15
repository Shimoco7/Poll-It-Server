const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const Answer = require('../models/answer_model');
const Poll = require('../models/poll_model');
const PollQuestion = require('../models/poll_question_model');
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
    Poll.deleteOne({pollName : constants.TEST_POLL_NAME}, (err)=>{
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
    Answer.deleteOne({answer : constants.TEST_ANSWER}, (err)=>{
        done();

    });
    Poll.deleteOne({pollName : constants.TEST_POLL_NAME}, (err)=>{
        done();
    });
    PollQuestion.deleteOne({pollQuestion: constants.TEST_QUESTION}, (err)=>{
        mongoose.connection.close();
        done();
    });


});
    describe('Testing Answer API',()=>{
    var userAccessToken;
    var clientAccessToken;
    var userId;
    var clientId
    var pollId;
    var pollQuestionId;
    test('Test createAnswer',async ()=>{
        console.log("\x1b[34m", "Starting Test: createAnswer...");


        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        const userLoginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });

        userAccessToken = userLoginResult.body.accessToken;
        userId = userLoginResult.body.account._id;
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD,
            role: constants.CLIENT
        });
        const clientLoginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL2,
            password: constants.TEST_PASSWORD
        });

        clientAccessToken = clientLoginResult.body.accessToken;
        clientId = clientLoginResult.body.account._id;

        const poll = await request(app).post('/poll/create').set(constants.AUTHORIZATION, constants.BEARER + " " + clientAccessToken).send({
            pollName: constants.TEST_POLL_NAME,
            accountId: clientId
        });
        pollId = poll.body._id;

        const pollQuestion = await request(app).post('/poll_question/create').set(constants.AUTHORIZATION, constants.BEARER + " " + clientAccessToken).send({
            pollQuestion: constants.TEST_QUESTION,
            pollQuestionType: constants.TEST_POLL_QUESTION_TYPE,
            pollId: pollId


        });
        pollQuestionId = pollQuestion.body._id;
        const response = await request(app).post('/answer/create').set(constants.AUTHORIZATION, constants.BEARER + " " + userAccessToken).send({
            _id: constants.TEST_ID,
            answer: constants.TEST_ANSWER,
            accountId: userId,
            pollId: pollId,
            pollQuestionId: pollQuestionId
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: createAnswer...");
    })

    test('Test getAnswerById',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAnswerById...");
        const response = await request(app).get('/answer/getAnswerById/'+constants.TEST_ID).set(constants.AUTHORIZATION, constants.BEARER + " " + clientAccessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.answer).toEqual(constants.TEST_ANSWER);
        console.log("\x1b[34m", "Finishing Test: getAnswerById...");
    });

    test('Test getAnswersByPollId',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAnswersByPollId...");
        const response = await request(app).get('/answer/getAnswersByPollId/'+pollId).set(constants.AUTHORIZATION, constants.BEARER + " " + clientAccessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        console.log("\x1b[34m", "Finishing Test: getAnswersByPollId...");
    });

    
    test('Test getAnswersByPollQuestionId',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAnswersByPollQuestionId...");
        const response = await request(app).get('/answer/getAnswersByPollQuestionId/'+pollQuestionId).set(constants.AUTHORIZATION, constants.BEARER + " " + clientAccessToken);
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: getAnswersByPollQuestionId...");
    });

});