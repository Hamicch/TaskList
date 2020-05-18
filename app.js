const form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

function loadEventListeners() {
	//DOM Load event
	document.addEventListener('DOMContentLoaded', getTask);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

function getTask() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task) => {
		// Create list items
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to list (li)
		li.appendChild(document.createTextNode(task));
		// Create a link tag
		const link = document.createElement('a');
		// Create link class
		link.className = 'delete-item secondary-content';
		// Add icon and append to link
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// append the link to li
		li.appendChild(link);
		// append the li to ul

		// console.log(li);
		taskList.appendChild(li);
	});
}

function addTask(e) {
	if (taskInput.value === '') {
		alert('Add task');
	}

	// Create list items
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// Create text node and append to list (li)
	li.appendChild(document.createTextNode(taskInput.value));
	// Create a link tag
	const link = document.createElement('a');
	// Create link class
	link.className = 'delete-item secondary-content';
	// Add icon and append to link
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// append the link to li
	li.appendChild(link);
	// append the li to ul

	// console.log(li);
	taskList.appendChild(li);

	// Store in Local Storage
	storeTaskInLocalStorage();

	// Clear input
	taskInput.value = '';

	e.preventDefault();
}

function storeTaskInLocalStorage(task) {
	let tasks = localStorage.getItem('tasks');
	if (tasks == null || tasks == 'null') {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task function
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure you want to delete this task?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage() {
	let tasks = localStorage.getItem('tasks');
	if (tasks == null || tasks == 'null') {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach((task, index) => {
		if (taskItems.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task function
function clearTasks() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	// taskList.innerHTML = '';

	// Clear from LS
	clearTasksFromLocalStorage();
}

// Clear tasks function
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter task function
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
