import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function MicrophoneButton() {
  const [isActive, setIsActive] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
const handleClick = async () => {
    if (!isActive) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

            if (!stream) return; // Abbrechen, wenn kein Stream vorhanden ist.

            if (!window.MediaRecorder) {
                console.error('MediaRecorder is not supported in this browser.');
                return;
            }

            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = event => {
                if (event.data.size > 0) {
                    setRecordedChunks(prev => [...prev, event.data]);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                // Hier ist wichtig: Zuerst warten wir, bis recordedChunks aktualisiert sind
                const blob = new Blob([...recordedChunks], { type: 'audio/wav' });
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
                }

                setRecordedChunks([]); // Reset für die nächste Aufnahme
            };

            mediaRecorderRef.current.start();
        } catch (error) {
            console.error('Error accessing the microphone:', error);
        }
    } else {
        if (mediaRecorderRef.current) { // Überprüfe, ob mediaRecorderRef gesetzt ist
            mediaRecorderRef.current.stop();
        } else {
            console.error('MediaRecorder is not initialized.');
        }
    }

    setIsActive(!isActive);
};
  return (
    <button
      className={`microphone-button ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faMicrophone} /> {isActive ? 'Stoppen' : 'Mikrofon'}
    </button>
  );
}

export default MicrophoneButton;
