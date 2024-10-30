import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GeneralLayout from '../components/Preferences/GeneralLayout';
import * as navigateService from '../services/designFunctions';

jest.mock('../services/designFunctions', () => ({
  useNavigateTo: jest.fn(),
}));

describe('GeneralLayout Component', () => {
  const navigateMock = jest.fn();
  
  beforeEach(() => {
    navigateService.useNavigateTo.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    step: 1,
    question: 'Test Question',
    component_one: <div>Component One</div>,
    class_name_one: 'classOne',
    class_name_two: 'classTwo',
    component_two: <div>Component Two</div>,
    nextRoute: '/next',
    isTutorialCompleted: false,
  };

  it('renders step and question text', () => {
    render(<GeneralLayout {...defaultProps} />);
  });

  it('renders both components in their respective containers', () => {
    render(<GeneralLayout {...defaultProps} />);
  });

  it('renders "Weiter" button when isTutorialCompleted is false', () => {
    render(<GeneralLayout {...defaultProps} />);
    const button = screen.getByText('Weiter');
  });

  it('renders "Speichern" button when isTutorialCompleted is true', () => {
    render(<GeneralLayout {...defaultProps} isTutorialCompleted={true} />);
    const button = screen.getByText('Speichern');
  });

  it('navigates to next route on button click', () => {
    render(<GeneralLayout {...defaultProps} />);
    const button = screen.getByText('Weiter');
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith('/next');
  });
});
