// src/tests/controller/preferencesController.test.js
import axios from 'axios';
import { savePreferences } from '../../services/preferencesController';
import { server } from '../../mocks/server';

// Mock Axios als Teil des Setups
jest.mock('axios');

// Startet den Mock-Server vor allen Tests und stoppt ihn danach
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('savePreferences', () => {
  it('sollte Präferenzen erfolgreich speichern', async () => {
    // Simuliere eine erfolgreiche Antwort für den Axios-Post-Request
    axios.post.mockResolvedValue({ data: { message: 'Präferenzen erfolgreich gespeichert' } });

    const data = { preference: 'dark-mode' };

    // Aufruf der Funktion und Test der erwarteten Antwort
    const result = await savePreferences(data);

    // Überprüfe das Ergebnis
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ message: 'Präferenzen erfolgreich gespeichert' });

    // Überprüfen, ob die axios.post-Methode mit den richtigen Parametern aufgerufen wurde
    expect(axios.post).toHaveBeenCalledWith(
      'http://assistant-core:8080/backend/message/',
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
});
