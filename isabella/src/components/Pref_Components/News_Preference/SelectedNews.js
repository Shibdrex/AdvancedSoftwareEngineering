import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const allOptions = [
  "inland", "ausland", "sport", "wirtschaft", "video", "wissen", "investigatives"
];

function SelectNews({ onSelect }) {
  const [availableOptions, setAvailableOptions] = useState(allOptions);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value); // Nachricht hinzufügen
    setAvailableOptions(availableOptions.filter(option => option !== value)); // Entferne aus der Liste
  };

  return (
    <FormControl fullWidth style={{ background: 'white' }}>
      <InputLabel>Wähle einen Bereich aus</InputLabel>
      <Select value={selectedValue} onChange={handleChange}>
        {availableOptions.map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectNews;
