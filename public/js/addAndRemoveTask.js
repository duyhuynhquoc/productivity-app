let isReadyToSubmit = false

let addTasksButtons = document.querySelectorAll('.add-task__button')
let submitButtons = document.querySelectorAll('.submit-button')
let addTaskInputs = document.querySelectorAll(
	'.add-task__input input[type=text]'
)

function handleAddTaskClick() {
	let addTask = this.parentElement
	let inputContainer = addTask.querySelector('.add-task__input')

	this.style.display = 'none'
	inputContainer.style.display = 'flex'

	let input = inputContainer.querySelector('input[type=text]')
	input.value = ''
	input.focus()
}

function hideInputAndShowButton(thisElement) {
	let inputContainer = thisElement.parentElement.parentElement
	inputContainer.style.display = 'none'

	let input = inputContainer.querySelector('input[type=text]')
	let inputValue = input.value

	let addTask = inputContainer.parentElement
	let addTaskButton = addTask.querySelector('.add-task__button')

	addTaskButton.style.display = 'flex'
}

addTasksButtons.forEach((addTasksButton) => {
	addTasksButton.addEventListener('click', handleAddTaskClick)
})

function mouseOverSubmit() {
	isReadyToSubmit = true
}

function mouseOutSubmit() {
	isReadyToSubmit = false
}

submitButtons.forEach((button) => {
	// Check if mouse is over submit button
	button.addEventListener('mouseover', mouseOverSubmit)
	button.addEventListener('mouseout', mouseOutSubmit)
})

function handleBlurInput() {
	if (isReadyToSubmit && this.value != '') {
		let form = this.parentElement
		form.submit()
	}

	hideInputAndShowButton(this)

	// update current Task list
	updateTaskList()
}

// Check input is not focused
addTaskInputs.forEach((input) => {
	input.addEventListener('blur', handleBlurInput)
})

///
/// DELETE TASKS
///
