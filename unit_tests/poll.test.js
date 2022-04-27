const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const Poll = require('../models/poll_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************Poll API Tests*******************");
    Account.deleteOne({email : constants.TEST_EMAIL}, (err)=>{
        done();
    });
    Account.deleteOne({email: constants.TEST_EMAIL2}, (err)=>{
        done();
    });
    Poll.deleteOne({pollName : constants.TEST_POLL_NAME}, (err)=>{
        done();
    });

});

afterAll(done=>{
    Account.deleteOne({email: constants.TEST_EMAIL}, (err)=>{
        done();
    });
    Account.deleteOne({email: constants.TEST_EMAIL2}, (err)=>{
        done();
    });
    Poll.deleteOne({pollName : constants.TEST_POLL_NAME}, (err)=>{
        mongoose.connection.close();
        done();

    });

});

describe('Testing Poll API',()=>{
    var accessToken;
    test('Test Create Poll',async ()=>{
        console.log("\x1b[34m", "Starting Test: Create Poll...");
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

        const response = await request(app).post('/poll/create').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            pollName: constants.TEST_POLL_NAME
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: Create Poll...");
    })

    test('Test Get All Polls',async ()=>{
        console.log("\x1b[34m", "Starting Test: Get All Polls...");
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
        console.log("\x1b[34m", "Finishing Test: Get All Polls...");
    });



})