import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Stelle sicher, dass dieser Import korrekt ist
import { useNavigateTo } from '../../utils/designFunctions';

function ChangePref() {
    const navigateTo = useNavigateTo();
    return (
        <div>
            <span style={{ color: 'white', cursor: 'pointer' }} onClick={() => navigateTo('/home')}>
                <ArrowBackIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Zurück
            </span>
            <div className='content'>
                <p>Wähle einen Bereich, den du ändern willst</p>
                <flex className="flex-container"> {/* Statt <flex> <div> verwenden */}
                    <button className="preference-button" onClick={() => navigateTo('/setNews')}>Nachrichten</button>
                    <button className="preference-button" onClick={() => navigateTo('/setInterests')}>Interessen</button>
                    <button className="preference-button" onClick={() => navigateTo('/setTime')}>Wecker und Orte</button>
                    <button className="preference-button" onClick={() => navigateTo('/setDeadlines')}>Exams</button>
                </flex>
            </div>
        </div>
    );
}

export default ChangePref;
