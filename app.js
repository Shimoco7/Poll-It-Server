const app = require('./server');
const port = process.env.PORT;
const https_port = process.env.HTTPS_PORT;
const https = require("https");
const http = require("http");
const fs = require("fs");
const constants = require('./common/constants')

const options = {
  pfx: fs.readFileSync(__dirname +constants.CER_PATH),
  passphrase: process.env.CER_PASSWORD
};


http.createServer(app).listen(port, ()=>{
  console.log('Server is running on port ' + port)
});

https.createServer(options, app).listen(https_port, ()=>{
  console.log('Server is running on port ' + https_port)
});
