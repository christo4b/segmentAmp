const timeStamp = require('unix-timestamp')
timeStamp.round = true

const convertAmp = (line) => {
  line = JSON.parse(line)

  // INSERT ERROR CHECKING __
  // Do they have userid or device id? what about event type?

  let ret = {
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

  return ret
}

module.exports = convertAmp
