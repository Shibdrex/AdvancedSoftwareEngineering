import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubmitAll from '../components/SubmitAll';

describe('SubmitAll Component', () => {
  let onCompleteMock;

  beforeEach(() => {
    onCompleteMock = jest.fn(); // Mock für die onComplete-Funktion
    render(<SubmitAll onComplete={onCompleteMock} />); // Render die Komponente mit dem Mock
  });


  test('calls onComplete when the button is clicked', () => {
    const completeButton = screen.getByRole('button', { name: /Abschließen/i });
    fireEvent.click(completeButton); // Simuliere einen Klick auf den Button

    expect(onCompleteMock).toHaveBeenCalled(); // Überprüfe, ob die onComplete-Funktion aufgerufen wurde
  });
});
