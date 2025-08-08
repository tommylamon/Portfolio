// Basic Task Manager functionality
document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Handle task form submission
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const taskText = taskInput.value;

        // Flaw: No validation for empty input or duplicates
        if (taskText === '') {
            alert('Please enter a task!'); // Quick and basic error handling
        } else {
            // Add task to the list
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            taskItem.appendChild(taskSpan);

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-task-btn');
            removeBtn.addEventListener('click', () => {
                taskItem.remove(); // Removes task from DOM
            });

            taskItem.appendChild(removeBtn);
            taskList.appendChild(taskItem);

            // Flaw: Tasks are not saved anywhere, lost on refresh
            taskInput.value = ''; // Clear input
        }
    });
});
