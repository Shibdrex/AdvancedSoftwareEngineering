import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import SetNews from './components/Preferences/SetNews';
import SetInterests from './components/Preferences/SetInterests';
import SubmitAll from './components/Preferences/SubmitAll';
import FirstStartPage from './components/FirstStartPage';
import SetTime from './components/Preferences/SetTime';
import ChangePref from './components/Preferences/ChangePref';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isTutorialCompleted, setIsTutorialCompleted] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('tutorialCompleted');
    console.log('Tutorial completed:', completed);
    if (completed) {
      setIsTutorialCompleted(true);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    setIsTutorialCompleted(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          {isTutorialCompleted ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/changePref" element={<ChangePref />} />
              <Route path="*" element={<Navigate to="/home" />} /> {/* Alle anderen Routen zur Home-Seite leiten */}
            </>
          ) : (
            <>
              <Route path="/" element={<FirstStartPage/>} />
              <Route path="/setNews" element={<SetNews />} />
              <Route path="/setInterests" element={<SetInterests />} />
              <Route path="/setTime" element={<SetTime />} />
              <Route path="/submit_start_settings" element={<SubmitAll onComplete={completeTutorial} />} />
              <Route path="*" element={<Navigate to="/" />} /> {/* Alle anderen Routen zur ersten Seite leiten */}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
