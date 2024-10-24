import React from 'react';
import { Chip } from '@mui/material';

function SelectedNewsList({ selectedNews, onRemove }) {
  return (
    <div>
      {selectedNews.map((newsItem, index) => (
        <Chip
          key={index}
          label={newsItem}
          onDelete={() => {
            onRemove(newsItem); // Element entfernen
          }}
          sx={{
            margin: '5px', // Etwas Abstand zwischen den Chips
            backgroundColor: 'purple', // Helles Lila
            color: 'white', // Textfarbe
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
