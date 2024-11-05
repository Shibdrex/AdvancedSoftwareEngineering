import * as React from 'react';
import 'react-time-picker/dist/TimePicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button, Input } from '@mui/material';

function Clock({ onAddTask }) {
    const [time, setTime] = React.useState(null);
    const [location, setLocation] = React.useState('');

    const handleAddTime = () => {
        if (time) {
            const formattedTime = time.format('HH:mm'); // Format anpassen, wie du möchtest
            onAddTask({ type: 'Wecker', value: formattedTime });
            setTime(null);
        }
    };

    const handleAddLocation = () => {
        if (location) {
            onAddTask({ type: 'Wohnort', value: location });
            setLocation('');
        }
    };

    return (
        <div style={{ gap: '25px' }}>
            <div className="flex-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="flex-container" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Wecker stellen"
                            value={time}
                            onChange={(newValue) => setTime(newValue)}
                            sx={{
                                border: '2px solid white',
                                borderRadius: '8px',
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'white',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                            }}
                        />
                </LocalizationProvider>
                <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{
                        background: 'white',
                        width: '220px',
                        borderRadius: '5px',
                        padding: '10px 16px', // Innenabstand oben/unten verringern
                        border: 'none', // keinen Rahmen
                        outline: 'none',
                        borderBottom: '2px solid #007bff', // Kurzer blauer Rahmen als Unterstreichung
                        transition: 'border-bottom 0.2s',
                        '&:focus': {
                            outline: 'none',
                            borderBottom: '2px solid #0056b3', // Dunklerer blauer Rahmen beim Fokus
                        },
                    }}
                    
                    placeholder="Wähle deinen Wohnort"
                />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="contained" color="secondary" onClick={handleAddTime}>
                        + Wecker hinzufügen
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleAddLocation}>
                        + Wohnort hinzufügen
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Clock;