import React from 'react';
import MicrophoneButton from './HomeComponents/Microphone';
import NavBar from './HomeComponents/NavBar';

function Home() {
    return (
    <div>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* ms-auto für automatische Margin auf der linken Seite */}
      <NavBar />
      </div>
      <div className="microphone"> {/* ms-auto für automatische Margin auf der linken Seite */}
      <MicrophoneButton />
      </div>
    </div>
    );
  }

  export default Home;