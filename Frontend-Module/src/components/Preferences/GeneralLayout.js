import { useNavigateTo} from '../../utils/designFunctions';

function GeneralLayout({ step, question, component_one, class_name_one, class_name_two,component_two, nextRoute, isTutorialCompleted }) {
    const navigate = useNavigateTo();

    return (
      <div>
        <p>{step}/4 {question}</p>
        <hr></hr>
  
        <div className={{class_name_one}}>
          {component_one}
        </div>
  
        <hr></hr>
        <p style={{ color: 'white' }}>Deine Auswahl</p>
        <hr></hr>
  
        <div className={{class_name_two}}>
          {component_two}
        </div>
        <hr></hr>
        <div className="content">
        {isTutorialCompleted ? (
                <button className="preference-button" onClick={() => navigate(nextRoute)}>
                    Speichern
                </button>
            ) : (
                <button className="preference-button" onClick={() => navigate(nextRoute)}>
                    Weiter
                </button>
            )}
        </div>
      </div>
    );
  }

  export default GeneralLayout;