document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
  
    const form = document.getElementById('add-task-form');
    form.addEventListener('submit', addTask);
  });
  
  function fetchTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('task-container');
        container.innerHTML = '';
        data.forEach(task => {
          const taskDiv = document.createElement('div');
          taskDiv.className = 'task';
          taskDiv.dataset.id = task.id;
          taskDiv.innerHTML = `
            <h3 class="${task.completed ? 'completed' : ''}">${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="deleteTask('${task.id}')">Delete</button>
            <button onclick="toggleTask('${task.id}', ${task.completed})">
              ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          `;
          container.appendChild(taskDiv);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }
  
  function addTask(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
  
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      return response.json();
    })
    .then(() => {
      document.getElementById('task-title').value = '';
      document.getElementById('task-description').value = '';
      fetchTasks();
    })
    .catch(error => console.error(error));
  }
  
  function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      fetchTasks();
    })
    .catch(error => console.error(error));
  }
  
  function toggleTask(taskId, currentStatus) {
    fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentStatus })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return response.json();
    })
    .then(() => fetchTasks())
    .catch(error => console.error(error));
  }
  