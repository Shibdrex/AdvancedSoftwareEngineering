import React from 'react';
import { Chip } from '@mui/material';

function SelectedNewsList({ selectedNews, onRemove }) {
  return (
    <div>
      {selectedNews.map((newsItem, index) => (
        <Chip
          key={index}
          label={newsItem}
          onDelete={() => onRemove(newsItem)} // Element entfernen und wieder in der Auswahl anzeigen
          sx={{
            margin: '5px',
            backgroundColor: '#E0BBE4', // Helles Lila
            color: 'white',
            '&:hover': {
              backgroundColor: '#D9A3D1', // Dunkleres Lila beim Hover
            },
          }}
        />
      ))}
    </div>
  );
}

export default SelectedNewsList;
