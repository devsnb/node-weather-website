const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Set directory to serve static content
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Shilpa Mukherjee'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Shilpa Mukherjee'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		message: 'Please contact us for assistance',
		title: 'Help',
		name: 'Shilpa Mukherjee'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an address'
		})
	}

	geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
		if (err) {
			return res.send({
				error: err
			})
		}

		forecast(longitude, latitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				})
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Shilpa Mukherjee',
		errMsg: 'Page not found'
	})
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
