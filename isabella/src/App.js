import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function LandingPage() {
  return (
    <div>
    <div className="black-page">
      <div className="content">
        <h1 style={{ color: '#a64ac9', fontFamily: 'fantasy' }}>Isabella</h1>
        <p>
          Willkommen bei Isabella!<br />
          Deine kleine Begleitung neben dem Studium!
        </p>
        <Link to="/home">
          <button className="start-button">Jetzt starten!</button>
        </Link>
      </div>
    </div>
    <div className="half-page"></div>
    </div>
  );
}

function Home() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/" style={{color: 'purple'}}>Isabella</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link">Präferenzen bearbeiten</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>,
  <div className="microphone"> {/* ms-auto für automatische Margin auf der linken Seite */}
  <MicrophoneButton />
</div>
</div>
  );
}

function MicrophoneButton() {
  return (
    <button className="microphone-button">
      <FontAwesomeIcon icon={faMicrophone} /> {/* Mikrofon-Symbol */}
    </button>
  );
}
export default App;
