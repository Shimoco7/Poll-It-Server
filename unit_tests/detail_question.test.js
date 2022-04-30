const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************DetailQuestion API Tests*******************");
    Account.deleteOne({email : constants.TEST_EMAIL}, (err)=>{
        done();
    });
});

afterAll(done=>{
    Account.deleteOne({email: constants.TEST_EMAIL}, (err)=>{
        mongoose.connection.close();
        done();
    });
});

describe('Testing DetailQuestion API',()=>{
    var accessToken;
    test('Test getAllDetailQuestions',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAllDetailQuestions...");
        await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        accessToken = loginResult.body.accessToken;

        const response = await request(app).get('/detail_question/getAllDetailQuestions').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: getAllDetailQuestions...");
    });
})