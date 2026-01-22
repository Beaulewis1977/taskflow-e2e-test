const API_URL = '/api/tasks';

// DOM Elements
const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks');
const statusFilter = document.getElementById('status-filter');

// State
let tasks = [];

// API Functions
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
}

async function createTask(taskData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (response.ok) {
      await fetchTasks();
    }
  } catch (error) {
    console.error('Failed to create task:', error);
  }
}

async function updateTask(id, updates) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (response.ok) {
      await fetchTasks();
    }
  } catch (error) {
    console.error('Failed to update task:', error);
  }
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      await fetchTasks();
    }
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
}

// Render Functions
function renderTasks() {
  const filter = statusFilter.value;
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(t => t.status === filter);

  if (filteredTasks.length === 0) {
    tasksContainer.innerHTML = '<p style="color: #999; text-align: center;">No tasks found</p>';
    return;
  }

  tasksContainer.innerHTML = filteredTasks.map(task => `
    <div class="task-card ${task.status === 'completed' ? 'completed' : ''}">
      <div class="task-info">
        <h3>${escapeHtml(task.title)}</h3>
        ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
        <div class="task-meta">
          <span class="priority-badge priority-${task.priority}">${task.priority}</span>
          <span>Status: ${task.status.replace('_', ' ')}</span>
        </div>
      </div>
      <div class="task-actions">
        <select onchange="handleStatusChange(${task.id}, this.value)">
          <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
        <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Event Handlers
function handleStatusChange(id, status) {
  updateTask(id, { status });
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const priority = document.getElementById('priority').value;

  if (!title) return;

  await createTask({ title, description, priority });
  taskForm.reset();
});

statusFilter.addEventListener('change', renderTasks);

// Initialize
fetchTasks();
