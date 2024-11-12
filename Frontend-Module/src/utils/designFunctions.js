// designFunctions.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    // Return priority and setPriority so they can be used in other components
    return { tasks, task, setTask, priority, setPriority, removeTask, handleAddTask, getPriorityColor };
};

export const useTimeManagement = () => {
    const [timeLoc, setTimeLoc] = useState([]);

    const addTimeLoc = (task) => {
        setTimeLoc((prev) => [...prev, task]);
    };

    const removeTimeLoc = (index) => {
        setTimeLoc((prev) => prev.filter((_, i) => i !== index));
    };

    return { timeLoc, addTimeLoc, removeTimeLoc };
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

    const [tasks, setTasks] = useState([]);

    const handleRemoveTask = (index) => {
      setTasks(tasks.filter((_, i) => i !== index));
    };

    return {handleRemoveTask, tasks, setTasks}
}

export const useUserData = (selectedNews) => {
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [firstname, setFirstname] = useState('');
  
    const user = {
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