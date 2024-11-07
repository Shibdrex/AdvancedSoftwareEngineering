// controllers/preferencesController.js
import axios from 'axios';

export const savePreferences = async (data) => {
  try {
    const response = await axios.post('http://assistant-core:8080/api/data/preferences', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Fehler beim Speichern der Präferenzen:", error.response?.data || error.message);
    return { success: false, message: "Fehler beim Speichern der Präferenzen." };
  }
};
