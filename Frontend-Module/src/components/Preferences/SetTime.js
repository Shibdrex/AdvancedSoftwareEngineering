import React, { useState } from 'react';
import GeneralLayout from './GeneralLayout';
import Clock from './PrefComponents/Time/Clock';
import SetClockAndArea from './PrefComponents/Time/SetClockAndArea';

function App() {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className='content'>
        <GeneralLayout
            step={3}
            question="Stelle bitte deinen Wecker hier ein und gebe deinen Wohnort an oder andere Orte, wo du oft bist"
            component_one={<Clock onAddTask={addTask} />}
            class_name_one="clock-container"
            class_name_two="entry-list-container"
            component_two={<SetClockAndArea tasks={tasks} handleRemoveTask={removeTask} />}
            nextRoute="/submit_start_settings"
        />
        </div>
    );
}

export default App;
