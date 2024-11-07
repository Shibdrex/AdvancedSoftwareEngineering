import React from 'react';
import { savePreferences as savePreferencesToServer } from '../services/preferencesController';
import { useTaskManagement, useNewsManagement, useTimeManagement, useDeadLineManagement } from "../utils/designFunctions";
//import { useNavigate } from 'react-router-dom';

function SubmitAll({ onComplete }) {
  const { selectedNews } = useNewsManagement();
  const { tasks, priority } = useTaskManagement();
  const { timeLoc } = useTimeManagement();
  const { deadlines } = useDeadLineManagement();

  const savePreferences = async () => {
    const data = { tasks, priority };
    await savePreferencesToServer(data);
    onComplete();
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
          <button className="preference-button" onClick={() => savePreferences()}>
            Abschließen
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitAll;
