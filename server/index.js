const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory task storage
let tasks = [];
let nextId = 1;

// GET /api/tasks - List all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description = '', priority = 'medium' } = req.body;

  if (!title || title.length > 200) {
    return res.status(400).json({ error: 'Title is required and must be <= 200 chars' });
  }

  const task = {
    id: nextId++,
    title,
    description: description.slice(0, 1000),
    status: 'pending',
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  tasks.push(task);
  res.status(201).json(task);
});

// GET /api/tasks/:id - Get single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// PUT /api/tasks/:id - Update task
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status, priority } = req.body;
  if (title) task.title = title.slice(0, 200);
  if (description !== undefined) task.description = description.slice(0, 1000);
  if (status) task.status = status;
  if (priority) task.priority = priority;
  task.updatedAt = new Date().toISOString();

  res.json(task);
});

// DELETE /api/tasks/:id - Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`TaskFlow API running on port ${PORT}`);
});

module.exports = app;
