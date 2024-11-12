import React from 'react';
import GeneralLayout from './GeneralLayout';
import Clock from './PrefComponents/Time/Clock';
import SetClockAndArea from './PrefComponents/Time/SetClockAndArea';
import { useTimeManagement } from '../../utils/designFunctions';

function SetTime({ isTutorialCompleted }) {
  const { timeLoc, addTimeLoc, removeTimeLoc } = useTimeManagement();

  const nextRoute = isTutorialCompleted ? '/home' : "/setDeadlines";

  // Überprüfen, ob component_two leer ist (d.h. keine Zeiteinträge)
  const isComponentTwoEmpty = timeLoc.length === 0;

  return (
    <div className='content'>
      <GeneralLayout
        step={4}
        question="Stelle bitte deinen Wecker hier ein und gebe deinen Wohnort an oder andere Orte, wo du oft bist"
        component_one={<Clock onAddTask={addTimeLoc} />}
        class_name_one="clock-container"
        class_name_two="entry-list-container"
        component_two={<SetClockAndArea tasks={timeLoc} handleRemoveTask={removeTimeLoc} />}
        nextRoute={nextRoute}
        isTutorialCompleted={isTutorialCompleted}
        isComponentTwoEmpty={isComponentTwoEmpty}  // Weitergabe von isComponentTwoEmpty
      />
    </div>
  );
}

export default SetTime;
