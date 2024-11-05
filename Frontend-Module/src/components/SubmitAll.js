import React from 'react';
import { savePreferences as savePreferencesToServer } from '../services/preferencesController';
import { useTaskManagement, useNewsManagement, useTimeManagement } from "../utils/designFunctions";
//import { useNavigate } from 'react-router-dom';

function SubmitAll({ onComplete }) {
  const { selectedNews } = useNewsManagement();
  const { tasks } = useTaskManagement();
  const { timeLoc } = useTimeManagement();

  const savePreferences = async () => {
    const data = { news: selectedNews, tasks, timeLoc };
    const result = await savePreferencesToServer(data);
    if (result.success) {
      alert("Präferenzen wurden erfolgreich gespeichert!");
    } else {
      alert("Fehler beim Speichern der Präferenzen.");
    }
    onComplete();
  };
  
 /* const navigate = useNavigate();
  const submit = () => {
  navigate('/home'); // Zur "home"-Seite navigieren
  onComplete();
  }*/

  return (
    <div>
      <div className='half-page'></div>
      <div className='black-page'>
        <div className='content'>
          <p>
            Super! Deine Präferenzen wurden gespeichert!<br />
            Du kannst nun Isabella benutzen. <br />
            Die Präferenzen kannst du anpassen, wenn du magst.
          </p>
          <button className="preference-button" onClick={() => savePreferences()}>
            Abschließen
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitAll;
