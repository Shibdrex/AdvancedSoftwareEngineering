// context/PreferencesContext.js
import { useContext, createContext } from 'react';
import { savePreferences as savePreferencesToServer } from '../services/preferencesController'; // Importiere den Controller
import { useTaskManagement } from "../utils/designFunctions";
import { useNewsManagement } from "../utils/designFunctions";
import { useTimeManagement } from "../utils/designFunctions";

const PreferencesContext = createContext();

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({ children }) => {
  const { selectedNews, handleSelect, handleRemove } = useNewsManagement(); // Nutze den News Hook
  const { tasks, addTask, removeTask } = useTaskManagement();
  const { timeLoc, addTimeLoc, removeTimeLoc } = useTimeManagement();

  const savePreferences = async () => {
    const data = { news: selectedNews, tasks: tasks, timeLoc: timeLoc };
    const result = await savePreferencesToServer(data);
    if (result.success) {
      alert("Präferenzen wurden erfolgreich gespeichert!");
    } else {
      alert("Fehler beim Speichern der Präferenzen.");
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
