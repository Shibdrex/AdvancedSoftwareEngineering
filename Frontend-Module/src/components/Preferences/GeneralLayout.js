import { useNavigateTo } from '../../utils/designFunctions';
import React, {useEffect} from "react";

function GeneralLayout({ type, hook,  step, question, component_one, class_name_one, class_name_two, component_two, nextRoute, isTutorialCompleted, isComponentTwoEmpty }) {
    const navigate = useNavigateTo();

    useEffect( () => { //At the first rendering of the component
        const fetchData = async () => {
      const userId = null;
      try {
        if (type === "deadline") {
          await hook.getDeadlinesFromServer(userId);
        } else if (type === "interest") {
          await hook.getTasksFromServer(userId);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };

    if (isTutorialCompleted==true){
        fetchData();
    }
    }, []);
    const handleClick = async () => {
        const userId=null;
  // Führe navigate immer aus und wähle myOtherFunction dynamisch basierend auf dem type
  navigate(nextRoute);

  await hook.submit(userId)
};
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
                        onClick={() => handleClick()}
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
