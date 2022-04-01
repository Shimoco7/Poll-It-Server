const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT

app.listen(port,()=>{
    console.log('Server is running on port ' + port);
});

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',error=>{console.log(error)});
db.on('open',()=>{console.log('Connected to MongoDB')});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true,limit:'1m'}));
app.use(bodyParser.json());

const appRouter = require('./routes/router');
app.use('/',appRouter);
