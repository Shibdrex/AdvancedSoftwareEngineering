import { Button } from '@mui/material';
import React from 'react';

function SetClockAndArea({ tasks, handleRemoveTask }) {
    return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      {tasks.map((task, index) => (
  <div
    key={index}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'purple',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      color: 'white',
    }}
  >
    {/* Hier wird der Typ und der Wert des Tasks angezeigt */}
    {task.type}: {task.value}
    <Button variant="outlined" color="secondary" id="removeButton" onClick={() => handleRemoveTask(index)}>
      X
    </Button>
  </div>
      ))}
    </div>
    );
}

export default SetClockAndArea;
