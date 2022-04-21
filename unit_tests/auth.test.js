const app = require('../server');
const request = require('supertest');
const mongoosse = require('mongoose');
const { response } = require('../server');
const Account = require('../models/account_model');
const constants = require("../common/constants");

const email = 'test@adar.com';
const pwd = 'Adar1234@';

beforeAll(done=>{
    Account.remove({email : email}, (err)=>{
        done();
    });
});

afterAll(done=>{
    Account.remove({email : email}, (err)=>{
        mongoosse.connection.close();
        done();
    });
});



describe('Testing Auth API',()=>{
    var accessToken;
    var refreshToken;
    var _id;

    test('Test Tegister',async ()=>{
        const response = await request(app).post('/auth/register').send({
            email: email,
            password: pwd
        });
        expect(response.statusCode).toEqual(200);
    })

    test('Test Login',async ()=>{
        const response = await request(app).post('/auth/login').send({
            email: email,
            password: pwd
        });
        expect(response.statusCode).toEqual(200);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        _id = response.body.account._id;
    });

    test('Test Refresh Token',async ()=>{
        const response = await request(app).post('/auth/refreshToken').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            refreshToken: refreshToken
        });
        expect(response.statusCode).toEqual(200);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
    });

    test('Test Update',async ()=>{
        const response = await request(app).post('/auth/update').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: _id,
            gender: 'Male'
        });
        expect(response.statusCode).toEqual(200);
    });

    test('Test Logout',async ()=>{
        const response = await request(app).post('/auth/logout').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            refreshToken: refreshToken
        });
        expect(response.statusCode).toEqual(200);
    });
   
})