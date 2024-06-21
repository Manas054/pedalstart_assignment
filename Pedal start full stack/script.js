document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const taskModal = new bootstrap.Modal(document.getElementById('taskModal'), {});
    const taskModalTitle = document.getElementById('taskModalLabel');
    const taskModalBody = document.querySelector('#taskModal .modal-body');
    const deleteTaskButton = document.getElementById('deleteTaskButton');
    const editTaskButton = document.getElementById('editTaskButton');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentTaskId = null;

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDueDate').value;

        const task = {
            id: Date.now(),
            title,
            description,
            dueDate
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskForm.reset();
        displayTasks();
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.closest('.list-group-item')) {
            const taskId = event.target.closest('.list-group-item').dataset.id;
            currentTaskId = taskId;
            const task = tasks.find(task => task.id == taskId);
            taskModalTitle.textContent = task.title;
            taskModalBody.innerHTML = `
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Due Date:</strong> ${task.dueDate}</p>
            `;
            taskModal.show();
        }
    });

    deleteTaskButton.addEventListener('click', () => {
        tasks = tasks.filter(task => task.id != currentTaskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskModal.hide();
        displayTasks();
    });

    editTaskButton.addEventListener('click', () => {
        const task = tasks.find(task => task.id == currentTaskId);
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = task.dueDate;

        tasks = tasks.filter(task => task.id != currentTaskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskModal.hide();
        displayTasks();
    });

    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'list-group-item';
            taskItem.dataset.id = task.id;
            taskItem.textContent = `${task.title} - Due: ${task.dueDate}`;
            taskList.appendChild(taskItem);
        });
    }

    displayTasks();
});
