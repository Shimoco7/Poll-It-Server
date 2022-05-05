const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const appRouter = require('./routes/router');
const accountRouter = require('./routes/account_routes');
const pollRouter = require('./routes/poll_routes');
const pollQuestionRouter = require('./routes/poll_question_routes');
const detailRouter = require('./routes/detail_routes');
const detailQuestionRouter = require('./routes/detail_question_routes');
const answerRouter = require('./routes/answer_routes');
const authenticate = require("./common/auth_middleware");
const constants = require("./common/constants");
// const Account = require('./models/account_model');
// const passport = require('passport')
// const passportJWT = require("passport-jwt")
// const JWTStrategy = passportJWT.Strategy
// const ExtractJWT = passportJWT.ExtractJwt
// const FacebookStrategy = require('passport-facebook').Strategy
// const { ObjectId } = require('mongodb');

 
// passport.use(new FacebookStrategy({
//   clientID: "516510840018543",
//   clientSecret: "a415b995610ccf9f30e1e4fc2e5dbdee",
//   callbackURL: "http://localhost:8000/auth/facebook/callback",
//   passReqToCallback : true,
//   profileFields: ['id', 'emails', 'name']
// },
// function(req, accessToken, refreshToken, profile, done) {
//   console.log("req "+ req.body,"accesstoken: " + accessToken + "refreshToken " + refreshToken + "profile: " +profile.emails[0].value)
//    Account.findOne({
//           'facebookId': profile.id 
//       }, function(err, account) {
//           if (err) {
//               return done(err);
//           }
//           if (!account) {
//              account = new Account({
//              facebookID: profile.id,
//              name: profile.displayName,
//               provider: 'facebook',
//               facebook: profile._json
//               });
//               account.save(function(err) {
//                   if (err) console.log(err);
//                   return done(err, account);
//               });
//           } else {
//               return done(err, account);
//           }
//       });
// }
// ));

app.use("/storage",authenticate([constants.USER]), express.static(path.resolve(__dirname + '/storage')));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => { console.log(error) });
db.on('open', () => { console.log('Connected to MongoDB') });

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '1m' }));
app.use(bodyParser.json());
app.use('/', appRouter);
app.use('/auth', accountRouter);
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
      servers: [{ url: process.env.SERVER_URL, },],
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