import React from 'react';
import { savePreferences as savePreferencesToServer } from '../services/preferencesController';
import { useTaskManagement, useNewsManagement, useTimeManagement, useDeadLineManagement, useUserData } from "../utils/designFunctions";
import saveUser from '../services/userController';
//import { useNavigate } from 'react-router-dom';

function SubmitAll({ onComplete }) {
  const { selectedNews } = useNewsManagement();
  const { tasks, priority } = useTaskManagement();
  const { timeLoc } = useTimeManagement();
  const { deadlines } = useDeadLineManagement();
  const { user } = useUserData({ selectedNews });

  const savePreferences = async () => {
    try{
    const dataInterests = { tasks, priority };
    const dataTime = { timeLoc }
    const dataDeadlines = { deadlines }
    await savePreferencesToServer( dataInterests, dataTime, dataDeadlines, user.email );
    await saveUser(user);
    onComplete();
    }
    catch(exception){
      alert("Speicherung nicht möglich.")
    }
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
