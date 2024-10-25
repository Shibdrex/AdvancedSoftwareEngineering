import { useNavigate } from 'react-router-dom';

function SubmitAll(){
    const navigate = useNavigate();

    const handleNavigation = () => {
      navigate('/home'); // Hier die Route angeben, zu der du navigieren möchtest
    };

    return(
      <div>
      <div className="content">
      <p>Super! Deine Präferenzen wurden gespeichert! Du kannst nun Isabella benutzen. Die Präferenzen kannst du anpassen wenn du magst.</p>
            <button className="start-button" onClick={handleNavigation}>Abschließen</button>
      </div>
      </div>
    )
  }

export default SubmitAll;