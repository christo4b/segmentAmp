const fs = require('fs')
const stream = require('stream')
const querystring = require('querystring')
const { convertAmp } = require('./src/conversion.js')
const secret = require('./secret.js')
const https = require('https')
const readline = require('readline')
const brake = require('brake')
const pathToFile = './test/30events.txt'

// Set logging to true in order to see timestamp and Amp's response
const logging = false
const options = {
  hostname: 'api.amplitude.com',
  path: '/httpapi',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

// Throttled readStream
const rl = readline.createInterface({
  input: fs.createReadStream(pathToFile).pipe(brake(20000))
})

const ws = writeStreamToAmplitude()

rl.on('line', function(line){
  ws._write(line) 
})

function writeStreamToAmplitude(){
  const ws = stream.Writable()
  ws._write = function(chunk, enc, next){
    let obj = convertAmp(chunk.toString())
    if (logging) console.log(new Date())
    sendToAmplitude(JSON.stringify(obj))
  }
  return ws
}

function sendToAmplitude(data){
  // Format POST querystring
  const post_data = querystring.stringify({
    api_key: secret.api_key,
    event: data
  })
  
  const req = https.request(options, (res) => {      
    if (logging) console.log(`STATUS: ${res.statusCode}`)
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      if (logging) console.log(`BODY: ${chunk}`)
    })
  })

  req.on('error', (e) => {
    if (logging) console.log(`problem with request: ${e.message}`)
  })

  req.write(post_data)
  req.end()
}