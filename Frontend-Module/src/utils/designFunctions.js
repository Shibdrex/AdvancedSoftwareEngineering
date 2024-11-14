// designFunctions.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {getDeadlines, getPreferences, putDeadline, putPreference} from '../services/preferencesController';
import setDeadlines from "../components/Preferences/SetDeadlines";

export const useNavigateTo = () => {
    const navigate = useNavigate();

    return (location) => {
        navigate(location);
    };
};
export const useTaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState(''); // Add priority state

    const handleAddTask = () => {
        if (task && priority) {
            addTask({ name: task, priority });
            setTask('');
            setPriority(''); // Clear priority after adding task
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'wichtig':
                return 'red';
            case 'mittel':
                return 'orange';
            case 'unwichtig':
                return 'green';
            default:
                return 'grey';
        }
    };

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const getTasksFromServer = async (userId) => {  //Should be called in the beginning og /setInterests
        const tasks = await getPreferences(userId).data;//gets all preferences of the user
        setTask(tasks)
    };

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    // Return priority and setPriority so they can be used in other components
    return { tasks, task, setTask, priority, setPriority, removeTask, handleAddTask, getPriorityColor, getTasksFromServer };
};


export const useTimeManagement = () => {
    const [timeLoc, setTimeLoc] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const addTimeLoc = (task) => {
        setTimeLoc((prev) => [...prev, task]);
        setIsButtonDisabled(true); // Button deaktivieren, wenn ein Task hinzugefügt wird
    };

    const removeTimeLoc = (index) => {
        setTimeLoc((prev) => {
            const updatedTimeLoc = prev.filter((_, i) => i !== index);
            if (updatedTimeLoc.length === 0) {
                setIsButtonDisabled(false); // Button aktivieren, wenn alle Tasks entfernt wurden
            }
            return updatedTimeLoc;
        });
    };

    return { timeLoc, addTimeLoc, removeTimeLoc, isButtonDisabled };
};

export const useNewsManagement = () => {
    const [availableNews, setAvailableNews] = useState([
        'Inland',
        'Ausland',
        'Sport',
        'Wirtschaft',
        'Video',
        'Wissen',
        'Investigatives',
    ]);
    const [selectedNews, setSelectedNews] = useState([]);

    const handleSelect = (newsItem) => {
        setSelectedNews((prev) => [...prev, newsItem]);
        setAvailableNews((prev) => prev.filter((item) => item !== newsItem));
    };

    const handleRemove = (newsItem) => {
        setSelectedNews((prev) => prev.filter((item) => item !== newsItem));
        setAvailableNews((prev) => [...prev, newsItem]);
    };

    return { availableNews, selectedNews, handleSelect, handleRemove };
};

export const useDeadLineManagement = () => {
    const [selectedDate, setDate] = useState(null);
    const [examName, setExamName] = useState('');
    const [tasks, setTasks] = useState([]); // Zustand für Aufgaben hinzufügen
  
    const deadline = {
      selectedDate,
      examName,
    };
  
    const handleAddExam = () => {
      if (selectedDate && examName) {
        const formattedDate = selectedDate.toLocaleDateString('de-DE'); // Format für deutsches Datum
        const newTask = { name: examName, date: formattedDate };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setDate(null);
        setExamName('');
      }
    };

    const getDeadlinesFromServer = async (userId) => {  //Should be called in the beginning og /setDeadlines
        const deadlines = await getDeadlines(userId).data;  //gets all deadlines of the user
        setDeadlines(deadlines)
    };
  
    const handleRemoveTask = (index) => {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    };
  
    return {
      handleRemoveTask,
      tasks,
      setTasks,
      handleAddExam,
      deadline,
      setDate,
      setExamName,
        getDeadlinesFromServer
    };
  };

export const useUserData = (selectedNews) => {
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [firstname, setFirstname] = useState('');
  
    const user = {
      key: 0,
      email,
      location,
      firstname,
      selectedNews
    };
  
    return {
      user,
      selectedNews,
      setEmail,
      setLocation,
      setFirstname,
    };
  };