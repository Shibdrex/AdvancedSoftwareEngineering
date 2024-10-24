import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectNews({ availableNews, onSelect }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value); // Ausgewählte Nachricht an die Hauptkomponente senden
    setSelectedValue(''); // Auswahl zurücksetzen, nachdem ein Wert gewählt wurde
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Wähle einen Bereich aus</InputLabel>
      <Select value={selectedValue} onChange={handleChange}>
        {availableNews.map((newsItem) => (
          <MenuItem key={newsItem} value={newsItem}>
            {newsItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectNews;
