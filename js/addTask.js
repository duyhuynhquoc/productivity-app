let taskData = ['Todo 1']
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
	input.focus()
}

function hideInputAndShowButton(thisElement) {
	let inputContainer = thisElement.parentElement
	inputContainer.style.display = 'none'

	let input = inputContainer.querySelector('input[type=text]')
	let inputValue = input.value
	input.value = ''

	let addTask = inputContainer.parentElement
	let addTaskButton = addTask.querySelector('.add-task__button')

	addTaskButton.style.display = 'flex'

	// Add to current quadrant
	thisQuadrant = addTask.parentElement
	quadrantTaskList = thisQuadrant.querySelector('.quadrant__task-list')

	// Add task to quadrant
	quadrantTaskList.innerHTML += `
		<div class="task quadrant__task-list__task" draggable="true">
			<div class="round">
				<input type="checkbox" id="checkbox" />
				<label for="checkbox"></label>
			</div>
			<h4>${inputValue}</h4>
		</div>
	`

	return inputValue
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
	// Hide task input
	let newTask = hideInputAndShowButton(this)

	// Add task to database
	if (isReadyToSubmit && newTask != '') taskData.push(newTask)

	// update current Task list
	updateTaskList()
}

// Check input is not focused
addTaskInputs.forEach((input) => {
	input.addEventListener('blur', handleBlurInput)
})

// DISPLAY TASKS
function updateTaskList() {
	let taskHtmlArray = []

	// Add tasks to main task list
	taskData.forEach((task) => {
		taskHtmlArray.push(`
		<div class="task main-task-list__task-list__task" draggable="true">
			<div class="round">
				<input type="checkbox" id="checkbox" />
				<label for="checkbox"></label>
			</div>
			<h4>${task}</h4>
		</div>
		`)
	})

	taskHtml = taskHtmlArray.join('')

	mainTaskList = document.querySelector('.main-task-list__task-list')
	mainTaskList.innerHTML = taskHtml

	updateTasks()
}

updateTaskList()
