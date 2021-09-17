const request = require('request')

function fToC(fahrenheit) {
	return ((fahrenheit - 32) * 5) / 9
}

const forecast = (longitude, latitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=1b2b34f6a4e38591edaec5dc5681877b&query=${latitude},${longitude}&units=f`

	request({ url, json: true }, (err, res) => {
		if (err) {
			callback('Unable to connect to weather service', undefined)
		} else if (res.body.error) {
			callback('Unable to find location', undefined)
		} else {
			const {
				weather_descriptions: weatherDescription,
				temperature: currentTemp,
				feelslike: feelsLike,
				observation_time: time
			} = res.body.current

			const temp = fToC(currentTemp).toFixed(2)
			const fLike = fToC(feelsLike).toFixed(2)

			const today = new Date()
			const curTime =
				today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

			callback(
				undefined,
				`${weatherDescription}: At ${curTime} currently it is ${temp} degrees out. It feels like ${fLike} degrees out.`
			)
		}
	})
}

module.exports = forecast
