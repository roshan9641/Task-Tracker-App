import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskList({ tasks, deleteTask }) {
  return (
    <List>
      {tasks?.map((task) => (
        <ListItem key={task._id}>
          <ListItemText primary={task.name} secondary={task.description} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
