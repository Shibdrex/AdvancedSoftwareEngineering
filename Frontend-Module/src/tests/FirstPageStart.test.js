import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FirstStartPage from '../components/FirstStartPage';
import { useNavigateTo } from '../services/designFunctions'; // Import für den Hook

jest.mock('../services/designFunctions'); // Mock für useNavigateTo

describe('FirstStartPage Component', () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigateTo.mockReturnValue(navigateMock); // Setze den Mock für navigate
    render(<FirstStartPage />);
  });

  test('navigates to /setNews when the start button is clicked', () => {
    const startButton = screen.getByRole('button', { name: /Jetzt starten!/i });
    fireEvent.click(startButton);

    expect(navigateMock).toHaveBeenCalledWith('/setNews'); // Überprüfe, ob die navigate-Funktion aufgerufen wurde
  });
});