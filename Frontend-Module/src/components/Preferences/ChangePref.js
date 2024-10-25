import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ChangePref(){

    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/home');
        };
        

    return(
    <div>
       <span style={{color: 'white'}} onClick={backToHome}> 
       <ArrowBackIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />Zurück</span>
       <div className='content'>
        <p>Wähle einen Bereich, den du ändern willst</p>
        <flex class="flex-container">
        <button className="start-button">Interessen</button>
        <button className="start-button">Nachrichten</button>
        <button className="start-button">Wecker</button>
       </flex>
       </div>
    </div>
    );
}

export default ChangePref;