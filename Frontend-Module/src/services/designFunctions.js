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

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    return { tasks, addTask, removeTask };
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