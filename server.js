const fs = require('fs')
const https = require('https')
const es = require('event-stream')
const readLine = require('readline')
const querystring = require('querystring')
const convertAmp = require('./src/conversion.js')
const secret = require('./secret.js')
const pathToFile = './30events.txt'
const options = {
  hostname: 'api.amplitude.com',
  path: '/httpapi',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

fs.createReadStream(pathToFile)
  .pipe(es.split())
  .pipe(es.map(function (line, cb) {
    line = JSON.stringify(convertAmp(line))

    var post_data = querystring.stringify({
      api_key: secret.api_key,
      event:line
    })
    
    var req = https.request(options, (res) => {
      // console.log(`STATUS: ${res.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });


    req.write(post_data)
    req.end();

    cb(null, line)
  }))




