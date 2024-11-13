import axios from 'axios';
import { savePreferences } from '../../services/preferencesController';

// Mocken von axios
jest.mock('axios');

describe('savePreferences', () => {
  it('sollte Präferenzen erfolgreich speichern und die richtigen POST-Anfragen senden', async () => {
    const dataInterests = { tasks: [{ task: 'task1', pro: 'Wichtig' }] };
    const dataAlarmClock = { time: '08:00' };
    const dataDeadlines = [{ task: 'task1', datum: '21.07.2024' }];
    const email = 'test@example.com';

    // Mock der erfolgreichen Antwort von axios
    axios.post.mockResolvedValueOnce({ data: { message: 'Erfolgreich gespeichert' } });
    axios.post.mockResolvedValueOnce({ data: { message: 'Alarm erfolgreich gesetzt' } });
    axios.post.mockResolvedValueOnce({ data: { message: 'Deadlines erfolgreich gesetzt' } });

    // Testen, ob savePreferences die richtigen axios-Post-Aufrufe ausführt
    await savePreferences(dataInterests, dataAlarmClock, dataDeadlines, email);

    // Überprüfen, ob axios.post für den ersten Endpunkt aufgerufen wurde
    expect(axios.post).toHaveBeenCalledWith(
      `http://assistant-core:8080/api/data/preferences/users/${email}`,
      dataInterests,
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Überprüfen, ob axios.post für den zweiten Endpunkt (Alarm) aufgerufen wurde
    expect(axios.post).toHaveBeenCalledWith(
      'http://assistant-core:8080/alarm-set',
      dataAlarmClock,
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Überprüfen, ob axios.post für den dritten Endpunkt (Deadlines) aufgerufen wurde
    expect(axios.post).toHaveBeenCalledWith(
      `http://assistant-core:8080/api/data/deadlines/users/${email}`,
      dataDeadlines,
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('sollte Fehler korrekt behandeln und eine Fehlermeldung zurückgeben', async () => {
    const dataInterests = { tasks: [{ task: 'task1', pro: 'Wichtig' }] };
    const dataAlarmClock = { time: '08:00' };
    const dataDeadlines = [{ task: 'task1', datum: '21.07.2024' }];
    const email = 'test@example.com';

    // Simulieren eines Fehlers in der ersten POST-Anfrage
    axios.post.mockRejectedValueOnce(new Error('Fehler beim Speichern der Präferenzen'));

    // Aufruf der Funktion und Überprüfung des Fehlers
    const result = await savePreferences(dataInterests, dataAlarmClock, dataDeadlines, email);

    // Sicherstellen, dass die Funktion den Fehler zurückgibt
    expect(result).toEqual({ success: false, message: 'Fehler beim Speichern der Präferenzen.' });
    expect(axios.post).toHaveBeenCalledTimes(1); // Nur die erste Anfrage sollte fehlschlagen
  });
});
