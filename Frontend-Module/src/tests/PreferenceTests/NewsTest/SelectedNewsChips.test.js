import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedNewsChip from '../../../components/Preferences/PrefComponents/NewsPreference/SelectedNewsChips';

describe('SelectedNewsChip', () => {
  test('renders selected news chips and calls onRemove when a chip is deleted', () => {
    const selectedNews = ['News 1', 'News 2', 'News 3'];
    const onRemoveMock = jest.fn(); // Mock für die onRemove-Funktion

    render(<SelectedNewsChip selectedNews={selectedNews} onRemove={onRemoveMock} />);

    const firstChip = screen.getByText('News 1').closest('div');
    fireEvent.click(firstChip.querySelector('svg'));

    expect(onRemoveMock).toHaveBeenCalledWith('News 1');
  });
});
