import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Circle } from '@mui/icons-material';

function TaskList({ tasks, getPriorityColor }) {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index} style={{ borderBottom: '1px solid lightgrey', color: 'white' }}>
          <ListItemText primary={task.name} />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <Circle style={{ color: getPriorityColor(task.priority) }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
