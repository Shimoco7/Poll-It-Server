const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************Account API Tests*******************");
    Account.deleteOne({email : constants.TEST_EMAIL}, (err)=>{
        done();
    });
});

afterAll(done=>{
    Account.deleteOne({email : constants.TEST_EMAIL}, (err)=>{
        mongoose.connection.close();
        done();
    });
});



describe('Testing Account API',()=>{
    var accessToken;
    var refreshToken;
    var _id;

    test('Test Account Register',async ()=>{
        console.log("\x1b[34m", "Starting Test: Account Register...");
        const response = await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: Account Register...");
    })

    test('Test Account Login',async ()=>{
        console.log("\x1b[34m", "Starting Test: Account Login...");
        const response = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.account.email).toEqual(constants.TEST_EMAIL);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        _id = response.body.account._id;
        console.log("\x1b[34m", "Finishing Test: Account Login...");
    });

    test('Test Refresh Token',async ()=>{
        console.log("\x1b[34m", "Starting Test: Refresh Token...");
        const response = await request(app).post('/auth/refreshToken').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            refreshToken: refreshToken
        });
        expect(response.statusCode).toEqual(200);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        console.log("\x1b[34m", "Finishing Test: Refresh Token...");
    });

    test('Test Account Update',async ()=>{
        console.log("\x1b[34m", "Starting Test: Account Update...");
        const response = await request(app).post('/auth/update').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: _id,
            gender: 'Male'
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.gender).toEqual('Male');
        console.log("\x1b[34m", "Finishing Test: Account Update...");
    });

    test('Test Account Logout',async ()=>{
        console.log("\x1b[34m", "Starting Test: Account Logout...");
        const response = await request(app).post('/auth/logout').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            refreshToken: refreshToken
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: Account Logout...");
    });
   
})