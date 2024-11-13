import { Button } from '@mui/material';
import React from 'react';

function SetClockAndArea({ tasks, handleRemoveTask }) {
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            {tasks.map((task, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'purple',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '10px',
                        color: 'white',
                    }}
                >
                    {/* Task-Typ und Wert */}
                    {task.type}: {task.value}
                    <Button
                        variant="outlined"
                        color="secondary"
                        id="removeButton"
                        onClick={() => handleRemoveTask(index)} // Entfernt den Task
                    >
                        X
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default SetClockAndArea;
