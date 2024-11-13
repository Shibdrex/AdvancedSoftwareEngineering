import axios from 'axios';
import saveUser from '../../services/userController';

// Mocken von axios
jest.mock('axios');

describe('saveUser', () => {
  it('sollte eine POST-Anfrage an den richtigen Endpunkt senden und eine erfolgreiche Antwort verarbeiten', async () => {
    const mockUser = {
      email: 'test@example.com',
      firstname: 'John',
      location: 'Berlin',
    };

    // Mock der erfolgreichen Antwort von axios
    axios.post.mockResolvedValueOnce({
      data: { message: 'Erfolgreich gespeichert' },
    });

    // Mocken von console.log
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Testen, ob saveUser den richtigen axios-Post-Aufruf ausführt
    await saveUser(mockUser);

    // Überprüfen, ob axios.post mit dem richtigen Endpunkt und Daten aufgerufen wurde
    expect(axios.post).toHaveBeenCalledWith(
      'http://assistant-core:8080/api/data/users',
      { user: mockUser }
    );

    // Sicherstellen, dass console.log den richtigen Erfolgsausdruck ausgibt
    expect(console.log).toHaveBeenCalledWith(
      'Email erfolgreich gesendet',
      { message: 'Erfolgreich gespeichert' }
    );
  });
});
