import React from 'react';
import { Button } from '@mui/material';

function TaskList({ tasks, getPriorityColor, handleRemoveTask }) {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      {tasks.map((task, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'purple', // Hintergrund des Listenelements wird lila
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            color: 'white',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {/* Prioritäts-Punkt */}
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getPriorityColor(task.priority),
                marginRight: '10px',
              }}
            />
            {task.name}
          </span>
          <Button variant="contained" color="secondary" onClick={() => handleRemoveTask(index)}>
            X
          </Button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
