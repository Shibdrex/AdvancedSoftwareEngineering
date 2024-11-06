import Exam from './PrefComponents/Deadlines/exam'
import GeneralLayout from './GeneralLayout';
import React from 'react'
import ExamList from './PrefComponents/Deadlines/ExamList';
import { useState } from 'react';


function SetDeadlines({isTutorialCompleted}){
  const [tasks, setTasks] = useState([]);

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
    const nextRoute = isTutorialCompleted ? '/home' : "/submit_start_settings";
    return (
        <div className='content'>
        <GeneralLayout
          step={4}
          question="Gebe Klausuren an die anstehen und wann sie stattfinden."
          component_one={
            <div>
              <Exam tasks={tasks} setTasks={setTasks} />
            </div>
          }
          component_two={
            <div>
              <ExamList tasks={tasks} handleRemoveTask={handleRemoveTask} />
            </div>
          }
         nextRoute={nextRoute}
         isTutorialCompleted={isTutorialCompleted}
        />
        </div>
    );
}

export default SetDeadlines;