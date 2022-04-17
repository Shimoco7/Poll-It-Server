const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',error=>{console.log(error)});
db.on('open',()=>{console.log('Connected to MongoDB')});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true,limit:'1m'}));
app.use(bodyParser.json());

const appRouter = require('./routes/router');
app.use('/',appRouter);

const authRouter = require('./routes/auth_routes');
app.use('/auth', authRouter);

const pollRouter = require('./routes/poll_routes');
app.use('/poll', pollRouter);

const pollQuestionRouter = require('./routes/poll_question_routes');
app.use('/poll_question', pollQuestionRouter);

const detailRouter = require('./routes/detail_routes');
app.use('/detail', detailRouter);

const questionRouter = require('./routes/question_routes');
app.use('/question', questionRouter);

const answerRouter = require('./routes/answer_routes');
app.use('/answer', answerRouter);

if (process.env.NODE_ENV == "development") {
    const swaggerUI = require("swagger-ui-express")
    const swaggerJsDoc = require("swagger-jsdoc")
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Poll-it API",
                version: "1.0.0",
                description: "Poll-it Server side API Documentation",
            },
            servers: [{url: "http://" + process.env.IP +":" + process.env.PORT,},],
            security: [
              {
                bearerAuth: ['Authorization'],
              },
            ],
            components: {
                securitySchemes: {
                  bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                  }
                }
            }
        },
        apis: ["./routes/*.js", "./models/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs,{ explorer: true }));
 }

module.exports = app;