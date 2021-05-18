const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/board', (req, res) => {
	Task.find().then((tasks) => {
		res.render('taskboard.ejs', { tasks: tasks })
	})
})

router.post('/add', (req, res) => {
	const { task, done, quadrant } = req.body
	const newTask = new Task({ task, done, quadrant })
	newTask.save()

	res.redirect('/task/board')
})

router.post('/delete/:_id', async (req, res) => {
	const { _id } = req.params
	const deletedTask = await Task.findOneAndDelete(_id)
	res.redirect('/task/board')
})

module.exports = router
