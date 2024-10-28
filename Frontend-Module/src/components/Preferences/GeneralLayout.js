import { useNavigateTo} from '../../services/designFunctions';

function GeneralLayout({ step, question, component_one, class_name_one, class_name_two,component_two, nextRoute, isTutorialCompleted }) {
    const navigate = useNavigateTo();

    return (
      <div>
        <p>{step}/3 {question}</p>
        <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>
  
        <div className={{class_name_one}}>
          {component_one}
        </div>
  
        <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>
        <p style={{ color: 'white' }}>Deine Auswahl</p>
        <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>
  
        <div className={{class_name_two}}>
          {component_two}
        </div>
        <hr style={{ border: 'none', height: '2px', background: 'white' }}></hr>
        <div className="content">
        {isTutorialCompleted ? (
                <button className="start-button" onClick={() => navigate(nextRoute)}>
                    Speichern
                </button>
            ) : (
                <button className="start-button" onClick={() => navigate(nextRoute)}>
                    Weiter
                </button>
            )}
        </div>
      </div>
    );
  }

  export default GeneralLayout;