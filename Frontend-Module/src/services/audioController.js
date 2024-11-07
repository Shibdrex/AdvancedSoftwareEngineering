// controllers/audioController.js
import axios from 'axios';

export const sendAudioRecording = async (blob) => {
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');

    try {
        const response = await axios.post('http://assistant-core:8080/stt-to-text-mic', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Setzen des Headers für FormData
            },
        });

        console.log('Audio erfolgreich gesendet', response.data);
    } catch (error) {
        console.error('Fehler:', error.response?.data || error.message);
        throw error; // Weitergeben des Fehlers zur Handhabung im Aufrufer
    }
};
