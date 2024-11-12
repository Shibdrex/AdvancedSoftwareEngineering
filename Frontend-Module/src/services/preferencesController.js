// controllers/preferencesController.js
import axios from 'axios';

export const savePreferences = async (dataInterests, dataAlarmClock) => {
  try {
    await axios.post('http://assistant-core:8080/api/data/preferences', dataInterests, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await axios.post('http://assistant-core:8080/alarm-set', dataAlarmClock, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Fehler beim Speichern der Präferenzen:", error.response?.data || error.message);
    return { success: false, message: "Fehler beim Speichern der Präferenzen." };
  }

};
