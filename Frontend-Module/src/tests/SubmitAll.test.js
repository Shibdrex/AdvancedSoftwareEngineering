import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubmitAll from '../components/SubmitAll'; // Pfad zur Komponente anpassen
import { savePreferences as savePreferencesToServer } from '../services/preferencesController';

// Mocken der `savePreferencesToServer`-Funktion
jest.mock('../services/preferencesController', () => ({
  savePreferences: jest.fn(),
}));

describe('SubmitAll', () => {
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sollte savePreferences aufrufen, wenn der "Abschließen"-Button geklickt wird', async () => {
    // Simulieren des Erfolgs von savePreferencesToServer
    savePreferencesToServer.mockResolvedValueOnce({ success: true });

    render(<SubmitAll onComplete={mockOnComplete} />);

    const button = screen.getByRole('button', { name: /Abschließen/i });
    
    fireEvent.click(button);

    await waitFor(() => expect(savePreferencesToServer).toHaveBeenCalledTimes(1));
    expect(savePreferencesToServer).toHaveBeenCalledWith({
      news: expect.anything(),
      tasks: expect.anything(),
      timeLoc: expect.anything(),
    });
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('sollte einen Fehler anzeigen, wenn das Speichern der Präferenzen fehlschlägt', async () => {
    // Simulieren eines Fehlers bei savePreferencesToServer
    savePreferencesToServer.mockResolvedValueOnce({ success: false });

    render(<SubmitAll onComplete={mockOnComplete} />);

    const button = screen.getByRole('button', { name: /Abschließen/i });
    
    fireEvent.click(button);

    await waitFor(() => expect(savePreferencesToServer).toHaveBeenCalledTimes(1));
    expect(mockOnComplete).toHaveBeenCalled();
  });
});
