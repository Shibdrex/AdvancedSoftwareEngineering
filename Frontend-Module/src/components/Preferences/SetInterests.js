import React from 'react';
import InterestsFields from './PrefComponents/Interests/InterestsFields';
import InterestsList from './PrefComponents/Interests/InterestsList';
import GeneralLayout from './GeneralLayout';
import { useTaskManagement } from '../../utils/designFunctions';

function SetInterests({ isTutorialCompleted }) {
  const { tasks, task, setTask, priority, setPriority, removeTask, handleAddTask, getPriorityColor } = useTaskManagement();

  const nextRoute = isTutorialCompleted ? '/home' : '/setTime';

  // Überprüfen, ob component_two leer ist (d.h. keine Tasks)
  const isComponentTwoEmpty = tasks.length === 0;

  return (
    <div className="content">
      <GeneralLayout
        step={3}
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
              handleRemoveTask={removeTask}
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
