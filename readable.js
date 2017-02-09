const q = require('q')
const fs = require('fs')
const stream = require('stream')
const querystring = require('querystring')
const { convertAmp } = require('./src/conversion.js')
const secret = require('./secret.js')
const https = require('https')
const readline = require('readline')

const rl = readline.createInterface({
  input: fs.createReadStream('./test/30events.txt')
})

function writeStreamToAmplitude(){
  const ws = stream.Writable()
  ws._write = function(chunk, enc, next){
    let obj = convertAmp(chunk.toString())
    sendToAmplitude(JSON.stringify(obj))
  }
  return ws
}

const ws = writeStreamToAmplitude()
const options = {
  hostname: 'api.amplitude.com',
  path: '/httpapi',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
function sendToAmplitude(data){
      
    // Format POST querystring
    const post_data = querystring.stringify({
      api_key: secret.api_key,
      event: data
    })

    console.log("POST_DATA: ", post_data)
    
    const req = https.request(options, (res) => {      
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    })

    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`)
    })

    req.write(post_data)
    req.end()

}

rl.on('line', function(line){
  ws._write(line)
})