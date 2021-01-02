const request = require('request')
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGV2c25iIiwiYSI6ImNraXhhc2dnMDBoMTYydW42dWJxNDJncG0ifQ.zjZEIh0IY-uk4QDpXvP5Sg&limit=1`

  request({ url, json: true}, (err, res) => {
    if(err) {
      callback('Unable to connect to location services', undefined)
    } else if (res.body.features.length === 0) {
      callback('No matched location found', undefined)
    } else {
      const {place_name: location, center} = res.body.features[0]
      const [longitude, latitude] = center

      callback(undefined, { longitude, latitude, location })
    }
  })
}

module.exports = geocode