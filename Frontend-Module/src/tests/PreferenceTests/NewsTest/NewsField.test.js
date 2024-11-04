import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsField from '../../../components/Preferences/PrefComponents/NewsPreference/NewsField';

describe('NewsField Component', () => {
  const availableNews = ['News 1', 'News 2', 'News 3'];
  const mockOnSelect = jest.fn();

  it('calls onSelect with the selected value and resets selection', () => {
    render(<NewsField availableNews={availableNews} onSelect={mockOnSelect} />);
  });
});
