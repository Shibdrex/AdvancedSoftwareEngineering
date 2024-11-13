// controllers/preferencesController.js
import axios from 'axios';

export const savePreferences = async (dataInterests, dataAlarmClock, dataDeadlines, email) => {
  try {
    await axios.post('http://assistant-core:8080/api/data/preferences/users/'+ email, dataInterests, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await axios.post('http://assistant-core:8080/alarm-set', dataAlarmClock, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await axios.post('http://assistant-core:8080/api/data/deadlines/users/'+ email, dataDeadlines, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Fehler beim Speichern der Präferenzen:", error.response?.data || error.message);
    return { success: false, message: "Fehler beim Speichern der Präferenzen." };
  }

};
export const getPreferences = async(userId)=>{
  try{
    const response= axios.get('http://assistant-core:8080/api/data/preferences/users/'+userId+'/preferences');
    return {response: response}
  }catch (error){
    console.error("Fehler beim Laden der Präferenzen:", error.response?.data || error.message);
    return { success: false, message: "Fehler beim Laden der Präferenzen." };
  }
}
