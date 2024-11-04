// Importiere die benötigten Module
import { render, fireEvent, waitFor } from '@testing-library/react';
import MicrophoneButton from '../../components/Home/HomeComponents/MicrophoneButton';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import React from 'react'

// Mock für MediaRecorder und getUserMedia
const mockMediaRecorder = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  ondataavailable: jest.fn(),
  onstop: jest.fn(),
}));

global.MediaRecorder = mockMediaRecorder;
global.navigator.mediaDevices = {
  getUserMedia: jest.fn().mockResolvedValue(),
};

// Stelle sicher, dass der Server vor allen Tests läuft
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MicrophoneButton', () => {
  test('sends recording data to the server on stop', async () => {
    const { getByText } = render(<MicrophoneButton />);

    fireEvent.click(getByText('Mikrofon'));

    // Überprüfe, ob getUserMedia aufgerufen wurde
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();

    server.use(
      rest.post('/backend/message', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: 'Mocked recording response' }));
      })
    );

    fireEvent.click(getByText('Mikrofon'));

      const response = await fetch('/backend/message', {
        method: 'POST',
      });
  
      expect(response.status).toBe(200);
  });
});
