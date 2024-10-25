import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function NewsField({ availableNews, onSelect }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value); // Ausgewählte Nachricht an die Hauptkomponente senden
    setSelectedValue(''); // Auswahl zurücksetzen, nachdem ein Wert gewählt wurde
  };

  return (
    <flex class="flex-container">
    <FormControl
      sx ={{ 
      border: '2px solid white',
      borderRadius: '8px',
    }}
  >
    <InputLabel sx={{ color: 'white' }}>Wähle einen Bereich aus</InputLabel>
    <Select
      value={selectedValue}
      onChange={handleChange}
      sx={{
        color: 'white', // Textfarbe in der Auswahl
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'black', // Rahmenfarbe
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'black', // Rahmenfarbe beim Hover
        },
        '& .MuiSvgIcon-root': {
          color: 'black', // Farbe des Dropdown-Pfeils
        },
      }}
    >
      {availableNews.map((newsItem) => (
        <MenuItem key={newsItem} value={newsItem}>
          {newsItem}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  </flex>
  );
}

export default NewsField;
