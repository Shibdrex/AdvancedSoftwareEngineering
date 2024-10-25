import React from 'react';

function SetClockAndArea({ entries }) {
    return (
        <div style={{ marginTop: '20px', color: 'white' }}>
            <h5>Liste der Einträge:</h5>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>{entry.type}: {entry.value}</li>
                ))}
            </ul>
        </div>
    );
}

export default SetClockAndArea;
