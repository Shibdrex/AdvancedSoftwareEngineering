import { useNavigateTo } from '../../utils/designFunctions';

function GeneralLayout({ step, question, component_one, class_name_one, class_name_two, component_two, nextRoute, isTutorialCompleted, isComponentTwoEmpty }) {
    const navigate = useNavigateTo();
    console.log("isComponentTwoEmpty:", isComponentTwoEmpty);
    return (
        <div>
            <p>{step}/4 {question}</p>
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
