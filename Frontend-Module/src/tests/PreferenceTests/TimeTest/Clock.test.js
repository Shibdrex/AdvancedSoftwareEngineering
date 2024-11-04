import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Clock from '../../../components/Preferences/PrefComponents/Time/Clock';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

describe('Clock Component', () => {
    let onAddTask;

    beforeEach(() => {
        onAddTask = jest.fn();
        render(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Clock onAddTask={onAddTask} />
            </LocalizationProvider>
        );
    });

    test('handles location input and calls onAddTask with the correct location', () => {
        const locationInput = screen.getByPlaceholderText(/Wähle deinen Wohnort/i);
        fireEvent.change(locationInput, { target: { value: 'Berlin' } });

        fireEvent.click(screen.getByText(/\+ Wohnort hinzufügen/i));

        expect(onAddTask).toHaveBeenCalledWith({ type: 'Wohnort', value: 'Berlin' });
        expect(onAddTask).toHaveBeenCalledTimes(1);
    });
});
