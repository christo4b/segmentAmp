const fs = require('fs')
const https = require('https')
const es = require('event-stream')
const readLine = require('readline')
const timeStamp = require('unix-timestamp')
const querystring = require('querystring')
timeStamp.round = true

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
      api_key:'b8a4b65d5b20fca2615bcae6154ef56e',
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


function convertAmp(line) {
  line = JSON.parse(line)

  //INSERT ERROR CHECKING __ 
    // Do they have userid or device id? what about event type?

  // UNIT TESTING important for this

  let ret = {
    user_id: line.userId,
    device_id: line.context.device.id,
    time: timeStamp.fromDate(line.timestamp),
    os_name: line.context.os.name,
    os_version:line.context.os.version,
    platform: line.context.device.type,
    event_type: line.type,
    location_lat: line.context.location.latitude,
    location_lng: line.context.location.longitude,
    ip: line.ip,
    carrier: line.context.network.carrier,
    device_model: line.context.device.model,
    device_brand: line.context.device.brand,
  }

  return ret
}

