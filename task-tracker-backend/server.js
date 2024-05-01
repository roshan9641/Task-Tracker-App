const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/task-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Task Schema and Model
const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('http://localhost:5000/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('http://localhost:5000/api/tasks', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.delete('http://localhost:5000/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id; 
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId); 
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
