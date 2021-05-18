const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
	task: {
		type: String,
	},
	done: {
		type: Boolean,
		default: false,
	},
	quadrant: {
		type: Number,
		default: 4,
	},
})

module.exports = mongoose.model('Task', TaskSchema)
