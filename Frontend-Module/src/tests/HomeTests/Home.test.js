import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter importieren
import NavBar from '../../components/Home/HomeComponents/NavBar';
import IsabellaIcon from '../../components/Home/HomeComponents/IsabellaIcon';
import MicrophoneButton from '../../components/Home/HomeComponents/MicrophoneButton';

describe('Home Component', () => {
  it('renders NavBar component', () => {
    render(
      <MemoryRouter> {/* MemoryRouter um NavBar wickeln */}
        <NavBar />
      </MemoryRouter>
    );
  });

  it('renders IsabellaIcon component', () => {
    render(<IsabellaIcon />);
  });

  it('renders MicrophoneButton component', () => {
    render(<MicrophoneButton />);
  });
});
