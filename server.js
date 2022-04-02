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
            servers: [{url: "http://localhost:" + process.env.PORT,},],
        },
        apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 }

module.exports = app;