import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangePref from '../../components/Preferences/ChangePref';
import { useNavigateTo } from '../../services/designFunctions';

// Mocke die navigateTo-Funktion
jest.mock('../../services/designFunctions', () => ({
  useNavigateTo: jest.fn(),
}));

describe('ChangePref', () => {
  const navigateToMock = jest.fn();

  beforeEach(() => {
    // Setze den Mock für useNavigateTo zurück
    useNavigateTo.mockReturnValue(navigateToMock);
  });

  test('navigates to /home when back button is clicked', () => {
    render(<ChangePref />);
    
    // Klicke auf den Zurück-Button
    fireEvent.click(screen.getByText(/Zurück/i));
    
    // Überprüfen, ob navigateTo mit der korrekten URL aufgerufen wurde
    expect(navigateToMock).toHaveBeenCalledWith('/home');
  });

  test('navigates to /setNews when Nachrichten button is clicked', () => {
    render(<ChangePref />);
    
    // Klicke auf den Nachrichten-Button
    fireEvent.click(screen.getByText(/Nachrichten/i));
    
    // Überprüfen, ob navigateTo mit der korrekten URL aufgerufen wurde
    expect(navigateToMock).toHaveBeenCalledWith('/setNews');
  });

  test('navigates to /setInterests when Interessen button is clicked', () => {
    render(<ChangePref />);
    
    // Klicke auf den Interessen-Button
    fireEvent.click(screen.getByText(/Interessen/i));
    
    // Überprüfen, ob navigateTo mit der korrekten URL aufgerufen wurde
    expect(navigateToMock).toHaveBeenCalledWith('/setInterests');
  });

  test('navigates to /setTime when Wecker und Orte button is clicked', () => {
    render(<ChangePref />);
    
    // Klicke auf den Wecker und Orte-Button
    fireEvent.click(screen.getByText(/Wecker und Orte/i));
    
    // Überprüfen, ob navigateTo mit der korrekten URL aufgerufen wurde
    expect(navigateToMock).toHaveBeenCalledWith('/setTime');
  });
});
