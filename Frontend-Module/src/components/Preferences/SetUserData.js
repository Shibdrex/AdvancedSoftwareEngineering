import React from 'react';
import { TextField } from '@mui/material';
import { useUserData } from '../../utils/designFunctions';
import { useNavigateTo  } from '../../utils/designFunctions';

    function SetUserData() {
      const { user, setEmail, setLocation, setFirstname } = useUserData();

      const navigateTo = useNavigateTo();
    
      const isEmailValid = user.email.includes('@') && user.email.trim() !== '';
    
      const areFieldsEmpty = () => {
        return !isEmailValid || !user.location.trim() || !user.firstname.trim();
      };
    
      const handleNextClick = () => {
        if (areFieldsEmpty()) {
          alert('Bitte fülle alle Felder korrekt aus!');
          return;
        }
        navigateTo('/setNews');
      };
    
      return (
        <div className="content">
          <p>1/5 Gebe deine persönlichen Daten an.</p>
          <div className="flex-container">
            <TextField
              value={user.firstname}
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
              value={user.location}
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
              value={user.email}
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
    
  