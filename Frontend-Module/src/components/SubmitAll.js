import React, { useContext } from 'react';
import {usePreferences} from './PreferencesContext'

function SubmitAll({ onComplete }) {
  const { savePreferences } = useContext(usePreferences);

  const handleSubmit = async () => {
    await savePreferences(); // Speichern der Präferenzen
    onComplete(); // Funktion zum Abschluss aufrufen
  };

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
          <button className="preference-button" onClick={handleSubmit}>
            Abschließen
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitAll;
