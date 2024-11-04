// components/MicrophoneButton.js
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { sendAudioRecording } from '../../../services/audioController'; // Importiere den AudioController

function MicrophoneButton() {
  const [isActive, setIsActive] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleClick = async () => {
    if (!isActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

        if (!stream) return;

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
          // Warte, bis recordedChunks aktualisiert sind
          const blob = new Blob([...recordedChunks], { type: 'audio/wav' });

          try {
            await sendAudioRecording(blob); // Benutze den ausgelagerten Controller
          } catch (error) {
            console.error('Fehler beim Senden der Audioaufnahme:', error);
          }

          setRecordedChunks([]); // Reset für die nächste Aufnahme
        };

        mediaRecorderRef.current.start();
      } catch (error) {
        console.error('Error accessing the microphone:', error);
      }
    } else {
      if (mediaRecorderRef.current) {
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
