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
    <FormControl
    fullWidth
    sx={{
      backgroundColor: 'white',
      color: 'black', // Schriftfarbe ändern, falls nötig
      borderRadius: '4px', // Optional: Abrundung der Kanten
      marginBottom: '20px', // Abstand unten
    }}
  >
    <InputLabel sx={{ color: 'black' }}>Wähle einen Bereich aus</InputLabel>
    <Select
      value={selectedValue}
      onChange={handleChange}
      sx={{
        color: 'black', // Textfarbe in der Auswahl
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'black', // Rahmenfarbe
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'grey', // Rahmenfarbe beim Hover
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

  );
}

export default SelectNews;
