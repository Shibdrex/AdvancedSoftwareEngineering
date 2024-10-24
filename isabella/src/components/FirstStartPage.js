import React from 'react';
import { useNavigate } from 'react-router-dom';

function FirstStartPage() {
const navigate = useNavigate();

const handleNavigation = () => {
  navigate('/setNews'); // Hier die Route angeben, zu der du navigieren möchtest
};
    return (
      <div>
      <div className="black-page">
        <div className="content">
          <h1 style={{ color: '#a64ac9', fontFamily: 'fantasy' }}>Isabella</h1>
          <p>
            Willkommen bei Isabella!<br />
            Deine kleine Begleitung neben dem Studium!
          </p>
            <button className="start-button" onClick={handleNavigation}>Jetzt starten!</button>
        </div>
      </div>
      <div className="half-page"></div>
      </div>
    );
  }

  export default FirstStartPage;