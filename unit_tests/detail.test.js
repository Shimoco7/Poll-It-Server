const app = require('../server');
const request = require('supertest');
const mongoosse = require('mongoose');
const { response } = require('../server');
const Detail = require('../models/detail_model');
const Account = require('../models/account_model');
const constants = require("../common/constants");

beforeAll(done=>{
    console.log("\x1b[35m", "*******************Detail API Tests*******************");
    Account.remove({email : constants.TEST_EMAIL}, (err)=>{
        done();
    });
    Detail.remove({_id : constants.TEST_ID}, (err)=>{
        done();
    });

});

afterAll(done=>{
    Account.remove({email: constants.TEST_EMAIL}, (err)=>{
        done();
    });
    Detail.remove({_id : constants.TEST_ID}, (err)=>{
        mongoosse.connection.close();
        done();

    });

});

describe('Testing Detail API',()=>{
    var accessToken;
    var accountId;

    test('Test Create Detail',async ()=>{
        console.log("\x1b[34m", "Starting Test: Create Detail...");
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
            question: constants.TEST_QUESTION,
            questionId: constants.TEST_ID2,
            accountId: accountId
        });
        expect(response.statusCode).toEqual(200);
        console.log("\x1b[34m", "Finishing Test: Create Detail...");
    })

    test('Test Get Details By AccountID',async ()=>{
        console.log("\x1b[34m", "Starting Test: Get Details By Account ID...");
        const response = await request(app).get('/detail/getDetailsByAccountId/'+accountId).set(constants.AUTHORIZATION, constants.BEARER + " " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].answer).toEqual(constants.TEST_ANSWER);
        console.log("\x1b[34m", "Finishing Test: Get Details By Account ID...");
    });
})