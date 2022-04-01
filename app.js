const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const appRouter = require('./routes/router');

const port = process.env.PORT

app.listen(port,()=>{
    console.log('Server is running on port ' + port);
});

app.use('/',appRouter);