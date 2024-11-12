import React from 'react';
import { TextField } from '@mui/material';
import { useEmail } from '../../utils/designFunctions';
import { useNavigateTo  } from '../../utils/designFunctions';

function SetUserData() {
    const [email, setEmail] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const navigateTo = useNavigateTo();
  
    // Prüft, ob die E-Mail gültig ist
    const isEmailValid = email.includes('@') && email.trim() !== '';
  
    // Funktion, um leere Felder zu prüfen
    const areFieldsEmpty = () => {
      return !isEmailValid || !location.trim() || !firstname.trim();
    };
  
    const handleNextClick = () => {
      navigateTo('/setNews');
    };
  
    return (
      <div className="content">
        <p>1/5 Gebe deine persönlichen Daten an.</p>
        <div className="flex-container">
          <TextField
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            sx={{
              border: '2px solid white',
              borderRadius: '8px',
            }}
            label="Benutzernamen angeben"
            variant="outlined"
            fullWidth
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <hr />
          <TextField
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              border: '2px solid white',
              borderRadius: '8px',
            }}
            label="Wohnort angeben"
            variant="outlined"
            fullWidth
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <hr />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              border: '2px solid white',
              borderRadius: '8px',
            }}
            label="Email angeben"
            variant="outlined"
            fullWidth
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <hr />
          <button
            className={`preference-button ${areFieldsEmpty() ? 'disabled-button' : ''}`}
            onClick={handleNextClick}
            disabled={areFieldsEmpty()}
          >
            Weiter
          </button>
        </div>
      </div>
    );
  }
  
  export default SetUserData;
  
  