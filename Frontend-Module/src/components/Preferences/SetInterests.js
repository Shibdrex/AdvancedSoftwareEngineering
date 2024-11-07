import React, { useState } from 'react';
import InterestsFields from './PrefComponents/Interests/InterestsFields';
import InterestsList from './PrefComponents/Interests/InterestsList';
import GeneralLayout from './GeneralLayout';
import { useTaskManagement } from '../../utils/designFunctions';

function SetInterests({isTutorialCompleted}) {
  const { tasks, task, setTask, priority, setPriority, removeTask, handleAddTask, getPriorityColor } = useTaskManagement();

  
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