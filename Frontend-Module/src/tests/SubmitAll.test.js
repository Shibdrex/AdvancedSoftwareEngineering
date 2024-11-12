import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubmitAll from '../components/SubmitAll';
import saveUser from '../services/userController';
import { savePreferences as savePreferencesToServer } from '../services/preferencesController';


// Mocken der externen Dienste
jest.mock('../services/userController');
jest.mock('../services/preferencesController');

// Mock der benutzten Hooks
jest.mock('../utils/designFunctions', () => ({
  useTaskManagement: jest.fn(),
  useTimeManagement: jest.fn(),
  useDeadLineManagement: jest.fn(),
  useUserData: jest.fn(),
  useNewsManagement: jest.fn(),
}));

describe('SubmitAll', () => {
  it('sollte savePreferences mit den richtigen Daten aufrufen', async () => {
    // Mock für die Rückgabe von useNewsManagement
    const mockUseNewsManagement = {
      selectedNews: [], // Hier kannst du deine Mock-Daten einfügen
    };
    require('../utils/designFunctions').useNewsManagement.mockReturnValue(mockUseNewsManagement);

    // Mock für useTaskManagement mit angepasstem Format
    const mockUseTaskManagement = {
      tasks: [
        { task: 'task1', pro: 'Wichtig' },
        { task: 'task2', pro: 'Dringend' },
      ],
    };
    require('../utils/designFunctions').useTaskManagement.mockReturnValue(mockUseTaskManagement);

    // Mock für useTimeManagement
    const mockUseTimeManagement = {
      timeLoc: 'timeLocation',
    };
    require('../utils/designFunctions').useTimeManagement.mockReturnValue(mockUseTimeManagement);

    // Mock für useDeadLineManagement
    const mockUseDeadLineManagement = {
      deadlines: [
        { task: 'task1', datum: '21.07.2024' },
        { task: 'task2', datum: '21.07.2024' },
      ],
    };
    require('../utils/designFunctions').useDeadLineManagement.mockReturnValue(mockUseDeadLineManagement);

    // Mock für useUserData
    const mockUseUserData = {
      user: {
        email: 'test@example.com',
        firstname: 'test',
        location: 'stuttgart',
      },
      selectedNews: [],
      setEmail: jest.fn(),
      setLocation: jest.fn(),
      setFirstname: jest.fn(),
    };
    require('../utils/designFunctions').useUserData.mockReturnValue(mockUseUserData);

    // Mock des Erfolgs von saveUser
    saveUser.mockResolvedValueOnce({});

    // Mock für die onComplete-Callback-Funktion
    const mockOnComplete = jest.fn();

    // Rendern der SubmitAll-Komponente
    const { getByText } = render(<SubmitAll onComplete={mockOnComplete} />);

    // Klicke den "Abschließen"-Button
    const button = getByText('Abschließen');
    fireEvent.click(button);

    // Überprüfe, ob savePreferencesToServer mit den richtigen Daten aufgerufen wurde
    await waitFor(() => {
      // Überprüfe, ob savePreferencesToServer mit den gemockten Daten aufgerufen wurde
      expect(savePreferencesToServer).toHaveBeenCalledWith(
        { tasks: mockUseTaskManagement.tasks },  // tasks im richtigen Format
        { timeLoc: mockUseTimeManagement.timeLoc }, // timeLoc im richtigen Format
        { deadlines: mockUseDeadLineManagement.deadlines }, // deadlines im richtigen Format
        mockUseUserData.user.email // Benutzer-E-Mail
      );
    });

    // Überprüfe, ob saveUser mit den richtigen Benutzerdaten aufgerufen wurde
    await waitFor(() => {
      expect(saveUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstname: 'test',
        location: 'stuttgart',
      });
    });

    // Überprüfe, ob onComplete aufgerufen wurde
    expect(mockOnComplete).toHaveBeenCalled();
  });
});
