import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../components/Home/HomeComponents/NavBar';
import {useNavigateTo} from '../../utils/designFunctions';

jest.mock('../../utils/designFunctions', () => ({
  useNavigateTo: jest.fn(),
}));

describe('NavBar Component', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigateTo.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the navbar brand with correct text', () => {
    render(<NavBar />);
  });

  it('renders the "Präferenzen bearbeiten" link', () => {
    render(<NavBar />);
  });

  it('calls navigate function when "Präferenzen bearbeiten" link is clicked', () => {
    render(<NavBar />);
    const preferencesLink = screen.getByText('Präferenzen bearbeiten');
    fireEvent.click(preferencesLink);
    expect(navigateMock).toHaveBeenCalledWith('/changePref');
  });
});
