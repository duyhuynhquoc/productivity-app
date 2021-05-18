let tasks = document.querySelectorAll('.task')
let taskList = document.querySelectorAll('.task-list')

function dragStart() {
	thisTask = this
	thisTask.classList.add('dragging')
}

function dragEnd() {
	this.classList.remove('dragging')
}

function dragOver(e) {
	e.preventDefault()

	const dragging = document.querySelector('.task.dragging')

	// CHECK TASK TYPE, only allow to drop if they are the same type of task
	if (
		(dragging.classList.contains('quadrant__task-list__task') &&
			this.classList.contains('quadrant__task-list')) ||
		(dragging.classList.contains('main-task-list__task-list__task') &&
			this.classList.contains('main-task-list__task-list'))
	) {
		if (this) belowElement = getBelowElement(this, e.clientY)
		if (belowElement) {
			this.insertBefore(dragging, belowElement)
		} else this.append(dragging)
	}
}

taskList.forEach((quadrant) => quadrant.addEventListener('dragover', dragOver))

function getBelowElement(container, yCursor) {
	const draggableTasks = [...container.querySelectorAll('.task:not(.dragging)')]

	return draggableTasks.reduce(
		(closest, task) => {
			const box = task.getBoundingClientRect()
			const offset = yCursor - (box.top + box.height / 2)
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: task }
			} else {
				return closest
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element
}

function updateTasks() {
	// Update task elements
	tasks = document.querySelectorAll('.task')

	// Add drag events to task elements
	tasks.forEach((task) => task.addEventListener('dragstart', dragStart))
	tasks.forEach((task) => task.addEventListener('dragend', dragEnd))
}

updateTasks()
