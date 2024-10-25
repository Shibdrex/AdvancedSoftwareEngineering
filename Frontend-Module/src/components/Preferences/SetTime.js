import React, { useState } from 'react';
import GeneralLayout from './GeneralLayout';
import Clock from './PrefComponents/Time/Clock';
import SetClockAndArea from './PrefComponents/Time/SetClockAndArea';

function App() {
    const [entries, setEntries] = useState([]);

    const addEntry = (entry) => {
        setEntries((prev) => [...prev, entry]);
    };

    const removeEntry = (index) => {
        setEntries((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className='content'>
        <GeneralLayout
            step={3}
            question="Stelle bitte deinen Wecker hier ein und gebe deinen Wohnort an oder andere Orte, wo du oft bist"
            component_one={<Clock onAddEntry={addEntry} />}
            class_name_one="clock-container"
            class_name_two="entry-list-container"
            component_two={<SetClockAndArea entries={entries} onRemoveEntry={removeEntry} />}
            nextRoute="/submit_start_settings"
        />
        </div>
    );
}

export default App;
