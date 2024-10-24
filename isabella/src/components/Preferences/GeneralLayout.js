import { useNavigate } from 'react-router-dom';

function GeneralLayout({ step, question, component_one, class_name_one, class_name_two,component_two, nextRoute }) {
    const navigate = useNavigate();

    const handleNavigation = () => {
    navigate(nextRoute); // Hier die Route angeben, zu der du navigieren möchtest
    };

    return (
      <div>
        <p>{step}/4 {question}</p>
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
         <button className="start-button" onClick={handleNavigation}>Weiter</button>
        </div>
      </div>
    );
  }

  export default GeneralLayout;