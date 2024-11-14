import { useNavigateTo, useDeadLineManagement, useTaskManagement } from '../../utils/designFunctions';
import React, {useEffect} from "react";
import {getDeadlines, getPreferences, putDeadline, putPreference} from"../../services/preferencesController"



function GeneralLayout({ type, step, question, component_one, class_name_one, class_name_two, component_two, nextRoute, isTutorialCompleted, isComponentTwoEmpty }) {
    const navigate = useNavigateTo();
    useEffect(async () => { //At the first rendering of the component
        const userId=null;                 //the objects are retrieved from the server
        if (type == "deadline") {
            await useDeadLineManagement().getDeadlinesFromServer(userId)
        }else if(type=="interest"){
            await useTaskManagement().getTasksFromServer(userId)
        }
    }, []);
    return (
        <div>
            <p>{step}/5 {question}</p>
            <hr />
  
            <div className={class_name_one}>
                {component_one}
            </div>
  
            <hr />
            <p style={{ color: 'white' }}>Deine Auswahl</p>
            <hr />
  
            <div className={class_name_two}>
                {component_two}
            </div>
            <hr />
            <div className="content">
                {isTutorialCompleted ? (
                    <button
                    className={`preference-button ${isComponentTwoEmpty ? 'disabled-button' : ''}`}
                        onClick={() => navigate(nextRoute)}
                        disabled={isComponentTwoEmpty} // Button deaktiviert, wenn component_two leer ist
                    >
                        Speichern
                    </button>
                ) : (
                    <button
                        className={`preference-button ${isComponentTwoEmpty ? 'disabled-button' : ''}`}
                        onClick={() => navigate(nextRoute)}
                        disabled={isComponentTwoEmpty} // Button deaktiviert, wenn component_two leer ist
                    >
                        Weiter
                    </button>
                )}
            </div>
        </div>
    );
}

export default GeneralLayout;
