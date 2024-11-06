// src/tests/components/MicrophoneButton.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MicrophoneButton from '../../components/Home/HomeComponents/MicrophoneButton';
import { sendAudioRecording } from '../../services/audioController';

// Mocken der `sendAudioRecording` Funktion
jest.mock('../../services/audioController', () => ({
  sendAudioRecording: jest.fn(),
}));

// Mock des `MediaRecorder`-Objekts
let mockMediaRecorder;
beforeEach(() => {
  mockMediaRecorder = {
    start: jest.fn(),
    stop: jest.fn(),
    ondataavailable: jest.fn(),
    onstop: jest.fn(),
  };

  global.MediaRecorder = jest.fn(() => mockMediaRecorder);
});

// Mock für `navigator.mediaDevices.getUserMedia`
global.navigator.mediaDevices = {
  getUserMedia: jest.fn().mockResolvedValue(mockMediaRecorder),
};


afterEach(() => {
  jest.clearAllMocks();
});

describe('MicrophoneButton', () => {
  it('sollte Fehler in der Konsole ausgeben, wenn `getUserMedia` fehlschlägt', async () => {
    navigator.mediaDevices.getUserMedia.mockRejectedValueOnce(new Error('Zugriff auf Mikrofon fehlgeschlagen'));
    console.error = jest.fn();

    render(<MicrophoneButton />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Error accessing the microphone:', expect.any(Error)));
  });
});