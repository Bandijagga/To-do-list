document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('new-task').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        saveTask(taskText);
        newTaskInput.value = '';
        loadTasks();
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const editedTask = prompt("Edit task:", tasks[index]);
    
    if (editedTask !== null) {
        tasks[index] = editedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (task, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <span class="edit-button" onclick="editTask(${index})">Edit</span>
            <span class="delete-button" onclick="deleteTask(${index})">Delete</span>
        `;
        taskList.appendChild(li);
    });
}
