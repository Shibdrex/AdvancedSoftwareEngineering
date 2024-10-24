import React from 'react';
import { Chip } from '@mui/material';

function SelectedNewsList({ selectedNews, onRemove }) {
  return (
    <div>
      {selectedNews.map((newsItem, index) => (
        <Chip
          key={index}
          label={newsItem}
          onDelete={() => onRemove(newsItem)}
          sx={{
            margin: '5px',
            backgroundColor: 'purple',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkmagenta',
            },
          }}
        />
      ))}
    </div>
  );
}

export default SelectedNewsList;
