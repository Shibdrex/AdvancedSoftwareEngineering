import React, { useState } from 'react';
import GeneralLayout from './GeneralLayout';
import Clock from './PrefComponents/Time/Clock';
import SetClockAndArea from './PrefComponents/Time/SetClockAndArea';

function SetTime({isTutorialCompleted}) {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    const nextRoute = isTutorialCompleted ? '/home' : "/submit_start_settings";

    return (
        <div className='content'>
        <GeneralLayout
            step={3}
            question="Stelle bitte deinen Wecker hier ein und gebe deinen Wohnort an oder andere Orte, wo du oft bist"
            component_one={<Clock onAddTask={addTask} />}
            class_name_one="clock-container"
            class_name_two="entry-list-container"
            component_two={<SetClockAndArea tasks={tasks} handleRemoveTask={removeTask} />}
            nextRoute={nextRoute}
            isTutorialCompleted={isTutorialCompleted}
        />
        </div>
    );
}

export default SetTime;
