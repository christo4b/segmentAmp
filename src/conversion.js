const timeStamp = require('unix-timestamp')
timeStamp.round = true

// finds nested objects to avoid throwing reference errors
const checkNested = (obj, ...args) => {
  for (let i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) return false
    if (!obj[args[i]]) return false
    obj = obj[args[i]]
  }
  return true
}

const convertAmp = (line) => {
  if (!line || !checkForReqs(line)) throw Error('Missing Required Parameters')
  if (typeof line === 'string') JSON.parse(line)

  // My solution is assuming the input object contains these properties.
  // In production, we'd have a function that would check for the existence of these properties
  // I built some simple checks for the required parameters, but most of these are susceptible to reference errors
  return {
    user_id: line.userId,
    device_id: line.context.device.id,
    time: timeStamp.fromDate(line.timestamp),
    os_name: line.context.os.name,
    os_version: line.context.os.version,
    platform: line.context.device.type,
    event_type: line.type || 'unknown',
    location_lat: line.context.location.latitude,
    location_lng: line.context.location.longitude,
    ip: line.ip,
    carrier: line.context.network.carrier,
    device_model: line.context.device.model,
    device_brand: line.context.device.brand
  }
}

const checkForReqs = (line) => {
  // check to see if input contains userId OR device id
  if (line.userId) {
    return true
  } else {
    // The Device ID is nested so we use checkNested to give us a Boolean if it exists and is not falsey
    return (checkNested(line, 'context', 'device', 'id'))
  }
}

module.exports = {
  convertAmp: convertAmp,
  checkForReqs: checkForReqs,
  checkNested: checkNested
}
