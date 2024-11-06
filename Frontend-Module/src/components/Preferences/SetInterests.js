import React, { useState } from 'react';
import InterestsFields from './PrefComponents/Interests/InterestsFields';
import InterestsList from './PrefComponents/Interests/InterestsList';
import GeneralLayout from './GeneralLayout';
import { useTaskManagement } from '../../utils/designFunctions';

function SetInterests({isTutorialCompleted}) {
  const { tasks, addTask, removeTask } = useTaskManagement();
  const [task, setTask] = useState(''); // Zustand für die aktuelle Aufgabe
  const [priority, setPriority] = useState(''); // Priorität der Aufgabe

  const handleAddTask = () => {
      if (task && priority) {
          addTask({ name: task, priority }); // Füge Aufgabe und Priorität hinzu
          setTask(''); // Leere das Eingabefeld
          setPriority(''); // Leere die Priorität
      }
  };
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
  
    const nextRoute = isTutorialCompleted ? '/home' : '/setTime';
    
    return (
      <div className='content'>
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
              handleRemoveTask={removeTask} // Übergibt die Funktion hier
            />
          </div>
        }
       nextRoute={nextRoute}
       isTutorialCompleted={isTutorialCompleted}
      />
      </div>
    );
  }

  export default SetInterests;