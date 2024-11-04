// controllers/preferencesController.js
import axios from 'axios';

export const savePreferences = async (req, res) => {
  const { news, tasks, timeLoc } = req.body;
  
  try {
    const data = { news, tasks, timeLoc };
    await axios.post('http://localhost:2000/preferences', data);
    res.status(200).json({ message: "Präferenzen wurden erfolgreich gespeichert!" });
  } catch (error) {
    console.error("Fehler beim Speichern der Präferenzen:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Präferenzen." });
  }
};
