// designFunctions.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useTaskManagement } from '../../services/designFunctions';
import { useNavigateTo } from '../../services/designFunctions';
import { useNewsManagement } from '../../services/designFunctions';
import { useNavigate } from 'react-router-dom';

// Mock für useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('useTaskManagement', () => {
    test('should add and remove tasks', () => {
        const { result } = renderHook(() => useTaskManagement());

        // Teste das Hinzufügen einer Aufgabe
        act(() => {
            result.current.addTask('Task 1');
        });
        expect(result.current.tasks).toEqual(['Task 1']);

        // Teste das Entfernen einer Aufgabe
        act(() => {
            result.current.removeTask(0);
        });
        expect(result.current.tasks).toEqual([]);
    });
});

describe('useNewsManagement', () => {
    test('should select and remove news items', () => {
        const { result } = renderHook(() => useNewsManagement());

        // Teste das Auswählen eines Nachrichtenartikels
        act(() => {
            result.current.handleSelect('Inland');
        });
        expect(result.current.selectedNews).toEqual(['Inland']);
        expect(result.current.availableNews).toEqual(['Ausland', 'Sport', 'Wirtschaft', 'Video', 'Wissen', 'Investigatives']);

        // Teste das Entfernen eines Nachrichtenartikels
        act(() => {
            result.current.handleRemove('Inland');
        });
        expect(result.current.selectedNews).toEqual([]);
        expect(result.current.availableNews).toEqual(['Ausland', 'Sport', 'Wirtschaft', 'Video', 'Wissen', 'Investigatives','Inland',]);
    });
});

describe('useNavigateTo', () => {
    test('should navigate to a specified location', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const { result } = renderHook(() => useNavigateTo());
        
        // Teste das Navigieren
        act(() => {
            result.current('/home');
        });
        expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
});
