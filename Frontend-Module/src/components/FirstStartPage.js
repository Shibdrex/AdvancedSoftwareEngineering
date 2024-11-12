import React, { useState } from 'react';
import { useNavigateTo } from '../utils/designFunctions';
import { TextField } from '@mui/material';
import { useEmail } from '../utils/designFunctions';

function FirstStartPage() {
  const navigate = useNavigateTo();

  return (
    <div>
      <div className="black-page">
        <div className="content">
          <h1 style={{ color: '#a64ac9', fontFamily: 'fantasy' }}>Isabella</h1>
          <p>
            Willkommen bei Isabella!<br />
            Deine kleine Begleitung neben dem Studium!
          </p>
          
          <button
            className="preference-button"
            onClick={() => navigate('/setUserData')}
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
