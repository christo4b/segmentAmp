const fs = require('fs')
const stream = require('stream')
const querystring = require('querystring')
const { convertAmp } = require('./src/conversion.js')
const secret = require('./secret.js')
const https = require('https')
const readline = require('readline')
const brake = require('brake')

// Throttled readStream
const rl = readline.createInterface({
  input: fs.createReadStream('./test/events.txt').pipe(brake(5000))
})

const ws = writeStreamToAmplitude()

function writeStreamToAmplitude(){
  const ws = stream.Writable()
  ws._write = function(chunk, enc, next){
    let obj = convertAmp(chunk.toString())
    console.log(new Date())
    sendToAmplitude(JSON.stringify(obj))
  }
  return ws
}


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
    
    const req = https.request(options, (res) => {      
      console.log(`STATUS: ${res.statusCode}`)
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
      })
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