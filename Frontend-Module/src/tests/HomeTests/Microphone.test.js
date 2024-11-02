import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MicrophoneButton from '../../components/Home/HomeComponents/MicrophoneButton';

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

describe('MicrophoneButton', () => {

    test('starts recording when button is clicked', async () => {
        const { getByText } = render(<MicrophoneButton />);

        // Simuliere das Klicken auf den Button zum Starten der Aufnahme
        fireEvent.click(getByText('Mikrofon'));

        // Überprüfe, ob getUserMedia aufgerufen wurde
        expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true, video: false });
        
    });
});