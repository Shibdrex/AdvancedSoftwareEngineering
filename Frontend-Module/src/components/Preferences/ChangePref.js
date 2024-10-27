import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Stelle sicher, dass dieser Import korrekt ist

function ChangePref() {
    const navigate = useNavigate();

    const navigateTo = (location) => {
        navigate(location);
    };

    return (
        <div>
            <span style={{ color: 'white', cursor: 'pointer' }} onClick={() => navigateTo('/home')}>
                <ArrowBackIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Zurück
            </span>
            <div className='content'>
                <p>Wähle einen Bereich, den du ändern willst</p>
                <div className="flex-container"> {/* Statt <flex> <div> verwenden */}
                    <button className="start-button" onClick={() => navigateTo('/setInterests')}>Interessen</button>
                    <button className="start-button" onClick={() => navigateTo('/setNews')}>Nachrichten</button>
                    <button className="start-button" onClick={() => navigateTo('/setTime')}>Wecker und Orte</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePref;
