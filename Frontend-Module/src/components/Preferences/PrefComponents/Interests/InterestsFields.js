import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function InterestsFields({ task, setTask, priority, setPriority, handleAddTask }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', direction: 'row', gap: '50px' }}>
        <TextField
          sx ={{ 
          border: '2px solid white',
          borderRadius: '8px',}}
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

      <FormControl fullWidth 
      sx ={{ 
        border: '2px solid white',
        borderRadius: '8px',}}
        variant="outlined" style={{ marginBottom: '20px' }}>
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
    </div>

  );
}

export default InterestsFields;
