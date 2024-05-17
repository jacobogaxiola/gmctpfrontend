// src/TaskList.js
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const tasks = [
  { id: 1, task: 'Complete the report' },
  { id: 2, task: 'Attend the meeting' },
  { id: 3, task: 'Fix the bug' },
];

const TaskList = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Tareas
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.task} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
