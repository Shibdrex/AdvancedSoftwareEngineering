import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function MicrophoneButton() {
    const [isActive, setIsActive] = useState(false);
  
    const handleClick = () => {
      setIsActive(!isActive); // Toggle the active state
    };
  
    return (
      <button
        className={`microphone-button ${isActive ? 'active' : ''}`}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faMicrophone} />   Mikrofon
      </button>
    );
  }

  export default MicrophoneButton;