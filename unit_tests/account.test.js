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

    test('Test accountRegister',async ()=>{
        console.log("\x1b[34m", "Starting Test: accountRegister...");
        const response = await request(app).post('/auth/register').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: accountRegister...");
    })

    test('Test accountLogin',async ()=>{
        console.log("\x1b[34m", "Starting Test: accountLogin...");
        const response = await request(app).post('/auth/login').send({
            email: constants.TEST_EMAIL,
            password: constants.TEST_PASSWORD
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.account.email).toEqual(constants.TEST_EMAIL);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        _id = response.body.account._id;
        console.log("\x1b[34m", "Finishing Test: accountLogin...");
    });

    test('Test refreshToken',async ()=>{
        console.log("\x1b[34m", "Starting Test: refreshToken...");
        const response = await request(app).post('/auth/refreshToken').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            refreshToken: refreshToken
        });
        expect(response.statusCode).toEqual(200);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        console.log("\x1b[34m", "Finishing Test: refreshToken...");
    });

    test('Test accountUpdate',async ()=>{
        console.log("\x1b[34m", "Starting Test: accountUpdate...");
        const response = await request(app).post('/auth/update').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: _id,
            gender: 'Male'
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.gender).toEqual('Male');
        console.log("\x1b[34m", "Finishing Test: accountUpdate...");
    });

    test('Test accountLogout',async ()=>{
        console.log("\x1b[34m", "Starting Test: accountLogout...");
        const response = await request(app).post('/auth/logout').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            refreshToken: refreshToken
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: accountLogout...");
    });

    test('Test getAccountById',async ()=>{
        console.log("\x1b[34m", "Starting Test: getAccountById...");
        const response = await request(app).get('/auth/getAccountById/'+_id).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body._id).toEqual(_id);
        console.log("\x1b[34m", "Finishing Test: getAccountById...");
    });
   
})