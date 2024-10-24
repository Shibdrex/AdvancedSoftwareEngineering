import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TaskManager({ task, setTask, priority, setPriority, handleAddTask }) {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Neue Aufgabe"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          fullWidth
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <Button variant="contained" color="secondary" onClick={handleAddTask}>
          + Hinzufügen
        </Button>
      </div>

      <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel style={{ color: 'white' }}>Priorität</InputLabel>
        <Select
          value={priority}
          style={{ color: 'white' }}
          onChange={(e) => setPriority(e.target.value)}
          label="Priorität"
        >
          <MenuItem value="wichtig">Wichtig</MenuItem>
          <MenuItem value="mittel">Prio mittel</MenuItem>
          <MenuItem value="unwichtig">Unwichtig</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default TaskManager;
