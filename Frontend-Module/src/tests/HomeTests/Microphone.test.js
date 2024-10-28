// MicrophoneButton.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MicrophoneButton from '../../components/Home/HomeComponents/MicrophoneButton';
import '@testing-library/jest-dom';


describe('MicrophoneButton', () => {
  test('renders microphone button', () => {
    render(<MicrophoneButton />);

    const buttonElement = screen.getByRole('button', { name: /Mikrofon/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('toggles active class on click', () => {
    render(<MicrophoneButton />);

    const buttonElement = screen.getByRole('button', { name: /Mikrofon/i });
    
    expect(buttonElement).not.toHaveClass('active');

    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveClass('active');

    fireEvent.click(buttonElement);

    expect(buttonElement).not.toHaveClass('active');
  });
});
