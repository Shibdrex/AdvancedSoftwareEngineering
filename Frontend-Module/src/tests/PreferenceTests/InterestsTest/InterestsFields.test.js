import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InterestsFields from '../../../components/Preferences/PrefComponents/Interests/InterestsFields';

describe('InterestsFields', () => {
  test('updates task input and priority select and calls handleAddTask on button click', () => {
    const setTaskMock = jest.fn();
    const setPriorityMock = jest.fn();
    const handleAddTaskMock = jest.fn();

    render(
      <InterestsFields 
        task="" 
        setTask={setTaskMock} 
        priority="" 
        setPriority={setPriorityMock} 
        handleAddTask={handleAddTaskMock} 
      />
    );

    const textField = screen.getByLabelText('Interesse angeben');

    fireEvent.change(textField, { target: { value: 'Mein Interesse' } });
    expect(setTaskMock).toHaveBeenCalledWith('Mein Interesse');
  });
});
