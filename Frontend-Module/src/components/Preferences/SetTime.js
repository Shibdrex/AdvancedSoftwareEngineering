import React from 'react';
import GeneralLayout from './GeneralLayout';
import Clock from './PrefComponents/Time/Clock';

function SetTime(){

    return(
        <div className='content'>
        <GeneralLayout
        step={3}
        question="Um wie viel Uhr würdest du immer gerne aufstehen wollen?"
        component_one= {<Clock></Clock>}
        nextRoute="/submit_start_settings">
        </GeneralLayout>
        </div>
    )
}
    
export default SetTime;
