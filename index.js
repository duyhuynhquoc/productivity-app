const express = require('express')
const app = express()
const path = require('path')

// Routers
const taskRouter = require('./routes/task')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve static files in Express
app.use(express.static(path.join(__dirname, '/public')))
// Config Express for EJS
app.set('view engine', 'ejs')
// Set view directory
app.set('views', path.join(__dirname, '/views'))

app.use('/task', taskRouter)

// CONNECT MONGOOSE
const mongoose = require('mongoose')
mongoose
	.connect('mongodb://localhost:27017/productivityApp', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connnected to database')
	})
	.catch((err) => {
		console.log('Cannot connect to database')
		console.error(err)
	})

const PORT = 5000
app.listen(PORT, () => {
	console.log(`Server is listening on PORT ${PORT}`)
})
