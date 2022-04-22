const app = require('../server');
const request = require('supertest');
const mongoosse = require('mongoose');
const { response } = require('../server');
const Detail = require('../models/detail_model');
const Account = require('../models/account_model');
const constants = require("../common/constants");

const email = 'test@test.com';
const pwd = 'Test1234@';
const _id = "4eb6e7e7e9b7f4194e000003";
const answer = "Preschool";
const question = "Education Level";
const questionId = "4eb6e7e7e9b7f4194e000004";

beforeAll(done=>{
    Account.remove({email : email}, (err)=>{
        done();
    });
    Detail.remove({_id : _id}, (err)=>{
        done();
    });

});

afterAll(done=>{
    Account.remove({email: email}, (err)=>{
        done();
    });
    Detail.remove({_id : _id}, (err)=>{
        mongoosse.connection.close();
        done();
    });

});

describe('Testing Auth API',()=>{
    var accessToken;
    var accountId;

    test('Test Create Detail',async ()=>{
        await request(app).post('/auth/register').send({
            email: email,
            password: pwd
        });
        const loginResult = await request(app).post('/auth/login').send({
            email: email,
            password: pwd
        });

        accessToken = loginResult.body.accessToken;
        accountId = loginResult.body.account._id;

        const response = await request(app).post('/detail/create').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: _id,
            answer: answer,
            question: question,
            questionId: questionId,
            accountId: accountId
        });
        expect(response.statusCode).toEqual(200);
    })

    // test('Test Get Detail By AccountID',async ()=>{
    //     const response = await request(app).post('/auth/login').send({
    //         email: email,
    //         password: pwd
    //     });
    //     expect(response.statusCode).toEqual(200);
    //     accessToken = response.body.accessToken;
    //     refreshToken = response.body.refreshToken;
    //     _id = response.body.account._id;
    // });
})