import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SetClockAndArea from '../../../components/Preferences/PrefComponents/Time/SetClockAndArea'; // Stelle sicher, dass der Pfad zu deiner Komponente korrekt ist.

describe('SetClockAndArea Component', () => {
    let tasks;
    let handleRemoveTask;

    beforeEach(() => {
        // Beispielhafte Aufgaben für die Tests
        tasks = [
            { type: 'Wecker', value: '10:30' },
        ];

        // Mock-Funktion für handleRemoveTask
        handleRemoveTask = jest.fn();

        // Komponente rendern
        render(<SetClockAndArea tasks={tasks} handleRemoveTask={handleRemoveTask} />);
    })

    test('calls handleRemoveTask when remove button is clicked', () => {
        // Holen des Buttons für die erste Aufgabe
        const removeButton = screen.getAllByRole('button', { name: /x/i })[0];

        // Simuliere einen Klick auf den Entfernen-Button
        fireEvent.click(removeButton);

        // Überprüfen, ob handleRemoveTask mit dem korrekten Index aufgerufen wurde
        expect(handleRemoveTask).toHaveBeenCalledWith(0); // Index der ersten Aufgabe ist 0
        expect(handleRemoveTask).toHaveBeenCalledTimes(1); // Überprüfen, ob es nur einmal aufgerufen wurde
    });

    test('displays correct number of tasks', () => {
        // Überprüfen, ob die Anzahl der angezeigten Aufgaben mit der Anzahl der übergebenen Aufgaben übereinstimmt
        const taskElements = screen.getAllByText(/Wecker|Wohnort/i);
        expect(taskElements).toHaveLength(tasks.length); // Anzahl der Elemente sollte gleich der Anzahl der Aufgaben sein
    });
});
