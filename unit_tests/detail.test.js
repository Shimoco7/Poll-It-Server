const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const { response } = require('../server');
const Detail = require('../models/detail_model');
const Account = require('../models/account_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************Detail API Tests*******************");
    Account.deleteOne({email : constants.TEST_EMAIL}, (err)=>{
        done();
    });
    Detail.deleteOne({_id : constants.TEST_ID}, (err)=>{
        done();
    });

});

afterAll(done=>{
    Account.deleteOne({email: constants.TEST_EMAIL}, (err)=>{
        done();
    });
    Detail.deleteOne({_id : constants.TEST_ID}, (err)=>{
        mongoose.connection.close();
        done();

    });

});

describe('Testing Detail API',()=>{
    var accessToken;
    var accountId;

    test('Test createDetail',async ()=>{
        console.log("\x1b[34m", "Starting Test: createDetail...");
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

        const response = await request(app).post('/detail/create').set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken).send({
            _id: constants.TEST_ID,
            answer: constants.TEST_ANSWER,
            question: constants.TEST_DETAIL_QUESTION,
            questionId: constants.TEST_DETAIL_QUESTION_ID,
            accountId: accountId
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: createDetail...");
    })

    test('Test getDetailsByAccountId',async ()=>{
        console.log("\x1b[34m", "Starting Test: getDetailsByAccountId...");
        const response = await request(app).get('/detail/getDetailsByAccountId/'+accountId).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].answer).toEqual(constants.TEST_ANSWER);
        console.log("\x1b[34m", "Finishing Test: getDetailsByAccountId...");
    });
})