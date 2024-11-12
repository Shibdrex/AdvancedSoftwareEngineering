import React, { useState } from 'react';
import { useNavigateTo } from '../utils/designFunctions';
import { TextField } from '@mui/material';
import { useEmail } from '../utils/designFunctions';

function FirstStartPage() {
  const {email, setEmail} = useEmail();
  const navigate = useNavigateTo();

  // Funktion zur Überprüfung, ob die E-Mail gültig ist
  const isEmailValid = email.includes('@') && email !== '';

  return (
    <div>
      <div className="black-page">
        <div className="content">
          <h1 style={{ color: '#a64ac9', fontFamily: 'fantasy' }}>Isabella</h1>
          <p>
            Willkommen bei Isabella!<br />
            Deine kleine Begleitung neben dem Studium!
          </p>
          <p2 style={{ color: '#a64ac9', fontFamily: 'fantasy' }}>Gebe bitte vor dem Start deine Email wegen Verifizierungszwecke an.</p2>
          
          <TextField
            sx={{
              border: '2px solid white',
              borderRadius: '8px',
            }}
            label="Email angeben"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)} // E-Mail wird beim Tippen aktualisiert
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          
          <button
            className="preference-button"
            onClick={() => navigate('/setNews')}
            disabled={!isEmailValid} // Button deaktivieren, wenn die E-Mail ungültig ist
          >
            Jetzt starten!
          </button>
        </div>
      </div>
      <div className="half-page"></div>
    </div>
  );
}

export default FirstStartPage;
