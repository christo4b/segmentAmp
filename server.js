const fs = require('fs')
const readLine = require('readline')

const pathToFile = './4events.txt'

readLine.createInterface({
  input: fs.createReadStream(pathToFile),
  terminal: false
}).on('line', function(line){
  console.log("Line:", line)
})


