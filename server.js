const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const appRouter = require('./routes/router');
const authRouter = require('./routes/auth_routes');
const pollRouter = require('./routes/poll_routes');
const pollQuestionRouter = require('./routes/poll_question_routes');
const detailRouter = require('./routes/detail_routes');
const detailQuestionRouter = require('./routes/detail_question_routes');
const answerRouter = require('./routes/answer_routes');

app.use("/storage", express.static(path.resolve(__dirname + '/storage')));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => { console.log(error) });
db.on('open', () => { console.log('Connected to MongoDB') });

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '1m' }));
app.use(bodyParser.json());
app.use('/', appRouter);
app.use('/auth', authRouter);
app.use('/poll', pollRouter);
app.use('/poll_question', pollQuestionRouter);
app.use('/detail', detailRouter);
app.use('/detail_question', detailQuestionRouter);
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
      servers: [{ url: "http://" + process.env.IP + ":" + process.env.PORT, },],
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
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));
}

module.exports = app;