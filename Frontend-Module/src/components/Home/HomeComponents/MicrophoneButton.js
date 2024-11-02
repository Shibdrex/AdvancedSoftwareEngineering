import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function MicrophoneButton() {
  const [isActive, setIsActive] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleClick = async () => {
    if (!isActive) {
      // Starte die Aufnahme
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: 'audio/wav' });
        const arrayBuffer = await blob.arrayBuffer();
        const wavBlob = new Blob([new Uint8Array(arrayBuffer)], { type: 'audio/wav' });

        // Sende die WAV-Datei an den Server
        const formData = new FormData();
        formData.append('audio', wavBlob, 'recording.wav');

        try {
          const response = await fetch('http://localhost:2000/upload', {
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
    } else {
      // Stoppe die Aufnahme
      mediaRecorderRef.current.stop();
    }

    setIsActive(!isActive);
  };

  return (
    <button
      className={`microphone-button ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faMicrophone} /> Mikrofon
    </button>
  );
}

export default MicrophoneButton;
