const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1b2b34f6a4e38591edaec5dc5681877b&query=${latitude},${longitude}&units=f`

  request({ url, json: true}, (err, res) => {
    if(err) {
      callback('Unable to connect to weather service', undefined)
    } else if (res.body.error) {
      callback('Unable to find location', undefined)
    } else {
      const {weather_descriptions: weatherDescription, temperature: currentTemp, feelslike: feelsLike, observation_time: time} = res.body.current
      
      callback(undefined, `${weatherDescription}: At ${time} currently it is ${currentTemp} degrees out. It feels like ${feelsLike} degrees out.`)
    }
  })
}

module.exports = forecast