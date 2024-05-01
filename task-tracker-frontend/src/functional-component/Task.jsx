import React from 'react';
import { Typography } from '@mui/material';

const Task = ({ task }) => {
  return (
    <div>
      <Typography variant="h6">{task.name}</Typography>
      <Typography variant="body1">{task.description}</Typography>
    </div>
  );
};

export default Task;
