import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InterestsList from '../../../components/Preferences/PrefComponents/Interests/InterestsList';

describe('InterestsList', () => {
  test('renders tasks and calls handleRemoveTask on button click', () => {
    const tasks = [
      { name: 'Task 1', priority: 'wichtig' },
      { name: 'Task 2', priority: 'mittel' },
    ];

    // Mock für getPriorityColor
    const getPriorityColorMock = jest.fn((priority) => {
      if (priority === 'wichtig') return 'red';
      if (priority === 'mittel') return 'yellow';
      return 'grey';
    });

    const handleRemoveTaskMock = jest.fn();

    const { container } = render(
      <InterestsList 
        tasks={tasks} 
        getPriorityColor={getPriorityColorMock} 
        handleRemoveTask={handleRemoveTaskMock} 
      />
    );

    // Überprüfen, ob die Aufgaben gerendert werden
    tasks.forEach((task) => {
      expect(getPriorityColorMock).toHaveBeenCalledWith(task.priority); // Überprüfen, ob getPriorityColor mit dem richtigen Parameter aufgerufen wird
    });

    // Klicke auf die Schaltfläche zum Entfernen der ersten Aufgabe
    const removeButtons = screen.getAllByRole('button', { name: 'X' });
    fireEvent.click(removeButtons[0]);

    // Überprüfen, ob handleRemoveTask mit dem richtigen Index aufgerufen wird
    expect(handleRemoveTaskMock).toHaveBeenCalledWith(0);
  });
});
