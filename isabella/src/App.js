import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MicrophoneButton from './components/Home_Components/Microphone';
import NavBar from './components/Home_Components/NavBar';
import SelectNews from './components/Pref_Components/News_Preference/SelectedNews';
import SelectedNewsList from './components/Pref_Components/News_Preference/SelectedNewsList';
import TaskManager from './components/Pref_Components/Interests/TaskManager';
import TaskList from './components/Pref_Components/Interests/TaskList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pref_one" element={<Pref_One />} />
          <Route path="/pref_two" element={<Pref_Two />} />
          <Route path="/submit_start_settings" element={<Submit_All />} />
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
        <Link to="/pref_one">
          <button className="start-button">Jetzt starten!</button>
        </Link>
      </div>
    </div>
    <div className="half-page"></div>
    </div>
  );
}


function GeneralLayout({ step, question, component_one, class_name_one, class_name_two,component_two, nextRoute }) {
  return (
    <div>
      <p>{step}/4 {question}</p>
      <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>

      <div className={{class_name_one}}>
        {component_one}
      </div>

      <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>
      <p style={{ color: 'white' }}>Deine Auswahl</p>
      <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>

      <div className={{class_name_two}}>
        {component_two}
      </div>
      <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>
      <div className="content">
        <Link to={nextRoute}>
          <button className="start-button">Weiter</button>
        </Link>
      </div>
    </div>
  );
}

function Pref_One() {
  const [availableNews, setAvailableNews] = useState([
    'Inland',
    'Ausland',
    'Sport',
    'Wirtschaft',
    'Video',
    'Wissen',
    'Investigatives',
  ]);

  const [selectedNews, setSelectedNews] = useState([]);

  const handleSelect = (newsItem) => {
    // Nachricht zur Auswahl hinzufügen
    setSelectedNews([...selectedNews, newsItem]);
    // Aus der Liste der verfügbaren Nachrichten entfernen
    setAvailableNews(availableNews.filter((item) => item !== newsItem));
  };

  const handleRemove = (newsItem) => {
    // Nachricht aus der ausgewählten Liste entfernen
    setSelectedNews(selectedNews.filter((item) => item !== newsItem));
    // Nachricht wieder zur Auswahl hinzufügen
    setAvailableNews([...availableNews, newsItem]);
  };

  return (
    <GeneralLayout
      step={1}
      question="Welche Nachrichten schaust du so neben dem Studium?"
      component_one={<SelectNews availableNews={availableNews} onSelect={handleSelect} />}
      component_two={<SelectedNewsList selectedNews={selectedNews} onRemove={handleRemove} />}
      nextRoute="/pref_two"
    />
  );
}
function Pref_Two() {
  const [task, setTask] = useState(''); // Zustand für die aktuelle Aufgabe
  const [tasks, setTasks] = useState([]); // Liste der Aufgaben
  const [priority, setPriority] = useState(''); // Priorität der Aufgabe

  // Funktion zum Hinzufügen von Aufgaben
  const handleAddTask = () => {
    if (task && priority) {
      setTasks([...tasks, { name: task, priority }]); // Füge Aufgabe und Priorität hinzu
      setTask(''); // Leere das Eingabefeld
      setPriority(''); // Leere die Priorität
    }
  };

  // Funktion zum Entfernen einer Aufgabe
  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Entfernt die Aufgabe basierend auf dem Index
  };

  // Funktion, um die Farbe des Prioritäts-Punkts zu setzen
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'wichtig':
        return 'red';
      case 'mittel':
        return 'orange';
      case 'unwichtig':
        return 'green';
      default:
        return 'grey';
    }
  };

  return (
    <GeneralLayout
      step={2}
      question="Welche Interessen hast du so neben dem Studium?"
      component_one={
        <div>
          <TaskManager
            task={task}
            setTask={setTask}
            priority={priority}
            setPriority={setPriority}
            handleAddTask={handleAddTask}
          />
        </div>
      }
      component_two={
        <div>
          <TaskList
            tasks={tasks}
            getPriorityColor={getPriorityColor}
            handleRemoveTask={handleRemoveTask} // Übergibt die Funktion hier
          />
        </div>
      }
      nextRoute="/submit_start_settings"
    />
  );
}

function Submit_All(){

  return(
    <div>
       <div className="content">
    <p>Super! Deine Präferenzen wurden gespeichert! Du kannst nun Isabella benutzen. Die Präferenzen kannst du anpassen wenn du magst.</p>
    <Link to="/home">
          <button className="start-button">Abschließen</button>
        </Link>
    </div>
    </div>
  )
}

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

export default App;
