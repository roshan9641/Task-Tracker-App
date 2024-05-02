import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Grid } from '@mui/material';
import TaskForm from './functional-component/TaskForm';
import TaskList from './functional-component/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks/');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TaskForm addTask={addTask} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TaskList tasks={tasks} deleteTask={deleteTask} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
