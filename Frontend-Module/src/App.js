import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home'
import SetNews from './components/Preferences/SetNews';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetInterests from './components/Preferences/SetInterests';
import SubmitAll from './components/Preferences/SubmitAll';
import FirstStartPage from './components/FirstStartPage';
import SetTime from './components/Preferences/SetTime';
import ChangePref from './components/Preferences/ChangePref';

   

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FirstStartPage />} />
          <Route path="/setNews" element={<SetNews />} />
          <Route path="/setInterests" element={<SetInterests />} />
          <Route path="/setTime" element={<SetTime />} />
          <Route path="/submit_start_settings" element={<SubmitAll />} />
          <Route path="/home" element={<Home />} />
          <Route path="/changePref" element={<ChangePref />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
