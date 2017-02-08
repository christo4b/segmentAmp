const timeStamp = require('unix-timestamp')
timeStamp.round = true

const checkNested = (obj, ...args) => {
  for (let i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) return false
    obj = obj[args[i]]
  }
  return true
}

const convertAmp = (line) => {
  line = JSON.parse(line)

  if (!checkForReqs(line)) throw Error('Missing Parameters')

  return {
    user_id: line.userId,
    device_id: line.context.device.id,
    time: timeStamp.fromDate(line.timestamp),
    os_name: line.context.os.name,
    os_version: line.context.os.version,
    platform: line.context.device.type,
    event_type: line.type,
    location_lat: line.context.location.latitude,
    location_lng: line.context.location.longitude,
    ip: line.ip,
    carrier: line.context.network.carrier,
    device_model: line.context.device.model,
    device_brand: line.context.device.brand
  }
}

const checkForReqs = (line) => {
  // check for "type", if no type send an "unknown"
  if (!line.type) line.type = 'unknown'
  // check to see if USERid OR device id
  if (line.userId) {
    return true
  } else {
    // check for device id
    return checkNested(line, 'context', 'device', 'id')
  }
}

module.exports = {
  convertAmp: convertAmp,
  checkForReqs: checkForReqs,
  checkNested: checkNested
}
