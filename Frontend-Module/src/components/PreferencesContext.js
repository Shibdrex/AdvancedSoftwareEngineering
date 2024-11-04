import axios from 'axios'
import { useTaskManagement } from "../utils/designFunctions";
import { useNewsManagement } from "../utils/designFunctions";
import { useTimeManagement } from "../utils/designFunctions";
import { useContext, createContext } from 'react';

const PreferencesContext = createContext();

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({ children }) => {
  const { selectedNews, handleSelect, handleRemove } = useNewsManagement(); // Nutze den News Hook
  const { tasks, addTask, removeTask } = useTaskManagement();
  const { timeLoc, addTimeLoc, removeTimeLoc } = useTimeManagement();

  const savePreferences = async () => {
    try {
      const data = { news: selectedNews, tasks: tasks, timeLoc: timeLoc  }; // Hier nimmst du die ausgewählten Nachrichten
      await axios.post('http://localhost:2000/preferences', data);
      alert("Präferenzen wurden erfolgreich gespeichert!");
    } catch (error) {
      console.error("Fehler beim Speichern der Präferenzen:", error);
    }
  };

  return (
    <PreferencesContext.Provider value={{
      selectedNews,
      handleSelect,
      handleRemove,
      savePreferences,
      tasks,
      addTask,
      removeTask,
      timeLoc,
      addTimeLoc,
      removeTimeLoc
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};