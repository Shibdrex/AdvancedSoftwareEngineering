import Exam from './PrefComponents/Deadlines/exam';
import GeneralLayout from './GeneralLayout';
import React from 'react';
import ExamList from './PrefComponents/Deadlines/ExamList';
import { useDeadLineManagement } from '../../utils/designFunctions';

function SetDeadlines({ isTutorialCompleted }) {
  const { tasks, setTasks, handleRemoveTask } = useDeadLineManagement();

  const nextRoute = isTutorialCompleted ? '/home' : '/submit_start_settings';

  // Überprüfen, ob keine Aufgaben vorhanden sind (leere Liste)
  const isComponentTwoEmpty = tasks.length === 0;

  return (
    <div className="content">
      <GeneralLayout
        step={4}
        question="Gebe Klausuren an, die anstehen und wann sie stattfinden."
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
        isComponentTwoEmpty={isComponentTwoEmpty}  // Prop für den Status von component_two
      />
    </div>
  );
}

export default SetDeadlines;
