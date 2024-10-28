import React from 'react';
import MicrophoneButton from './HomeComponents/MicrophoneButton';
import NavBar from './HomeComponents/NavBar';
import IsabellaIcon from './HomeComponents/IsabellaIcon';


function Home() {
    return (
    <div>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* ms-auto für automatische Margin auf der linken Seite */}
      <NavBar />
      </div>
      <div className="flex-container">
      <IsabellaIcon />
      <hr></hr>
      <MicrophoneButton />
      </div>
    </div>
    );
  }

  export default Home;