import React from 'react';
import { Button } from '@mui/material';

function InterestsList({ tasks, getPriorityColor, handleRemoveTask }) {
  return (
        <div>
          {tasks.map((task, index) => (
            <div
              className="list"
              key={index}
            >
              <span className="prioContainer">
                <span
                  className="prio"
                  style={{
                    backgroundColor: getPriorityColor(task.priority),
                  }}
                />
                {task.name}
          </span>
          <Button variant="outlined" color="secondary" id = "removeButton" onClick={() => handleRemoveTask(index)}>
            X
          </Button>
        </div>
      ))}
    </div>
  );
}

export default InterestsList;
