// controllers/audioController.js
export const sendAudioRecording = async (blob) => {
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');

    try {
        const response = await fetch('http://localhost:2000/backend/message/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Fehler beim Senden der Audioaufnahme');
        }

        console.log('Audio erfolgreich gesendet');
    } catch (error) {
        console.error('Fehler:', error);
        throw error; // Weitergeben des Fehlers zur Handhabung im Aufrufer
    }
};
