const taskInput = document.getElementById('taskInput'); // Input field for adding tasks
const addTaskButton = document.getElementById('addTask');// Button to add tasks
const taskList = document.getElementById('taskList');// Unordered list to display tasks
const taskCount = document.getElementById('taskCount'); // Display the count of tasks
const taskForm = document.getElementById('taskForm'); // Form for adding tasks
const allFilter = document.getElementById('allFilter'); // Filter option: Show all tasks
const completedFilter = document.getElementById('completedFilter'); // Filter option: Show completed tasks
const uncompletedFilter = document.getElementById('uncompletedFilter'); // Filter option: Show uncompleted tasks

// Initialize task counter
let counter = 0;

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {

        const listItem = document.createElement('li'); // Create task elements
        listItem.classList.add('task-container', 'fade-in');
        const checkbox = document.createElement('input');// Create a checkbox for task completion
        checkbox.type = 'checkbox';
        const taskTextElement = document.createElement('span');// Create a span to display task text
        taskTextElement.textContent = taskText;
        const deleteButton = document.createElement('button'); // Create a button to delete a task
        deleteButton.textContent = 'Delete';

// Attach event listeners to the checkbox and delete button
        checkbox.addEventListener('change', toggleTask);
        deleteButton.addEventListener('click', deleteTask);

// Add the created elements to the task list
        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextElement);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem); // Add the task item to the list

// Clear the input field
        taskInput.value = '';

// Update the task counter
        counter++; // Increment the task counter
        taskCount.textContent = counter; // Update the displayed task count
    }
}
// Function to delete selected tasks
function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const tasksToDelete = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const listItem = checkbox.parentElement;
            tasksToDelete.push(listItem.querySelector('span').textContent);
            listItem.classList.add('fade-out'); // Add 'fade-out' class for animation
        }
    });

    if (tasksToDelete.length > 0) {
        const deleteConfirmation = confirm(`Deleting ${tasksToDelete.length} task(s):\n${tasksToDelete.join('\n')}`);
        if (deleteConfirmation) {
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const listItem = checkbox.parentElement;
                    setTimeout(() => {
                        taskList.removeChild(listItem);  // Remove the selected task
                        counter--; // Decrement the task counter
                        taskCount.textContent = counter; // Update the displayed task count
                    }, 500); // Delay the removal to match the animation duration (0.5s)
                }
            });
        }
    } else {
        alert("No tasks selected for deletion.");
    }
}


// Function to toggle task completion
function toggleTask(event) {
    const listItem = event.target.parentElement;
    // 
    if (event.target.checked) {
        listItem.classList.add('completed'); // Apply completed styling
    } else {
        listItem.classList.remove('completed'); // Remove completed styling
    }
}

// Function to delete a single task
function deleteTask(event) {
    const listItem = event.target.parentElement;
    const taskText = listItem.querySelector('span').textContent;

    const deleteConfirmation = confirm(`Deleting 1 task:\n${taskText}`);
    if (deleteConfirmation) {
        listItem.classList.add('fade-out');
        setTimeout(() => {
            taskList.removeChild(listItem);
            counter--; // Decrement the task counter
            taskCount.textContent = counter;
        }, 500); // Delay animation duration (0.5s)
    }
}

// Function to update task visibility based on the selected filter
function updateTaskVisibility(filter) {
// Remove the 'selected' class from all filter options
    allFilter.classList.remove('selected');
    completedFilter.classList.remove('selected');
    uncompletedFilter.classList.remove('selected');

// Add the 'selected' class to the active filter
    switch (filter) {
        case 'completed':
            completedFilter.classList.add('selected');
            break;
        case 'uncompleted':
            uncompletedFilter.classList.add('selected');
            break;
        default:
            allFilter.classList.add('selected');
    }
// Iterate through task items and show/hide based on the filter
    const taskItems = document.querySelectorAll('#taskList li');

    taskItems.forEach(taskItem => {
        switch (filter) {
            case 'completed':
                if (taskItem.classList.contains('completed')) {
                    taskItem.style.display = 'flex';
                } else {
                    taskItem.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!taskItem.classList.contains('completed')) {
                    taskItem.style.display = 'flex';
                } else {
                    taskItem.style.display = 'none';
                }
                break;
            default:
                taskItem.style.display = 'flex';
        }
    });
}
// Event listeners
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();


    addTask();
});

allFilter.addEventListener('click', () => updateTaskVisibility('all'));
completedFilter.addEventListener('click', () => updateTaskVisibility('completed'));
uncompletedFilter.addEventListener('click', () => updateTaskVisibility('uncompleted'));

// Initialize task visibility
updateTaskVisibility('all');

// Event listener for deleting selected tasks
const deleteSelectedButton = document.getElementById('deleteSelected');
deleteSelectedButton.addEventListener('click', deleteSelectedTasks);

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);
