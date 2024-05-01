import React, { useState, useEffect } from 'react';
function TaskTrackerApp() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching tasks:"));
      
    
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default TaskTrackerApp;
