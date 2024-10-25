import React, { useState } from 'react';
import InterestsFields from './PrefComponents/Interests/InterestsFields';
import InterestsList from './PrefComponents/Interests/InterestsList';
import GeneralLayout from './GeneralLayout';

function SetInterests() {
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
            <InterestsFields
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
            <InterestsList
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

  export default SetInterests;