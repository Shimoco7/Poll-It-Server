const app = require('./server');
const port = process.env.PORT;
const https = require("https");
const fs = require("fs");
const constants = require('./common/constants')

const options = {
  pfx: fs.readFileSync(__dirname +constants.CER_PATH),
  passphrase: process.env.CER_PASSWORD
};


https.createServer(options, app).listen(port, ()=>{
  console.log('Server is running on port ' + port)
});
