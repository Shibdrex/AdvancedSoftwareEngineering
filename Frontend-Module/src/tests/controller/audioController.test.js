// src/tests/controller/audioController.test.js
import axios from 'axios';
import { sendAudioRecording } from '../../services/audioController';
import { server } from '../../mocks/server';

// Mock Axios als Teil des Setups
jest.mock('axios');

// Startet den Mock-Server vor allen Tests und stoppt ihn danach
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('sendAudioRecording', () => {
    it('sollte Audio erfolgreich senden', async () => {
        // Simuliere eine erfolgreiche Antwort für den Axios-Post-Request
        axios.post.mockResolvedValue({ data: { message: 'Aufnahme erfolgreich' } });

        const blob = new Blob(['audio data'], { type: 'audio/wav' });

        // Aufruf der Funktion und Test der erwarteten Antwort
        await expect(sendAudioRecording(blob)).resolves.toBeUndefined();

        // Überprüfen, ob die axios.post-Methode mit den richtigen Parametern aufgerufen wurde
        expect(axios.post).toHaveBeenCalledWith(
            'http://assistant-core:8080/stt-to-text-mic',
            expect.any(FormData),
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    });

    it('sollte einen Fehler werfen, wenn der Server einen Fehler zurückgibt', async () => {
        axios.post.mockRejectedValue(new Error('Request failed'));

        const blob = new Blob(['audio data'], { type: 'audio/wav' });

        await expect(sendAudioRecording(blob)).rejects.toThrow('Request failed');
    });
});
