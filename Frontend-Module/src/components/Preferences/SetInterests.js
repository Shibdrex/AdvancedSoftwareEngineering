import React from 'react';
import InterestsFields from './PrefComponents/Interests/InterestsFields';
import InterestsList from './PrefComponents/Interests/InterestsList';
import GeneralLayout from './GeneralLayout';
import { useTaskManagement } from '../../utils/designFunctions';

function SetInterests({ isTutorialCompleted }) {
  const taskManagement = useTaskManagement();

  const nextRoute = isTutorialCompleted ? '/home' : '/setTime';

  // Überprüfen, ob component_two leer ist (d.h. keine Tasks)
    console.log(taskManagement.tasks)
  const isComponentTwoEmpty = taskManagement.tasks.length === 0;

  return (
    <div className="content">
      <GeneralLayout
        step={3}
        hook={taskManagement}
        type={"interest"}
        question="Welche Interessen hast du so neben dem Studium?"
        component_one={
          <div>
            <InterestsFields
              task={taskManagement.task}
              setTask={taskManagement.setTask}
              priority={taskManagement.priority}
              setPriority={taskManagement.setPriority}
              handleAddTask={taskManagement.handleAddTask}
            />
          </div>
        }
        component_two={
          <div>
            <InterestsList
              tasks={taskManagement.tasks}
              getPriorityColor={taskManagement.getPriorityColor}
              handleRemoveTask={taskManagement.removeTask}
            />
          </div>
        }
        nextRoute={nextRoute}
        isTutorialCompleted={isTutorialCompleted}
        isComponentTwoEmpty={isComponentTwoEmpty}  // Weitergabe von isComponentTwoEmpty
      />
    </div>
  );
}

export default SetInterests;
