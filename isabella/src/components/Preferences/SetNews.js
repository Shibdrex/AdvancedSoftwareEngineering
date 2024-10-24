import React, { useState } from 'react';
import GeneralLayout from './GeneralLayout';
import SelectNews from './PrefComponents/NewsPreference/SelectedNews';
import SelectedNewsList from './PrefComponents/NewsPreference/SelectedNewsList';
import { useNavigate } from 'react-router-dom';

function SetNews() {
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
      // Nachricht zur Auswahl hinzufügen
      setSelectedNews([...selectedNews, newsItem]);
      // Aus der Liste der verfügbaren Nachrichten entfernen
      setAvailableNews(availableNews.filter((item) => item !== newsItem));
    };
  
    const handleRemove = (newsItem) => {
      // Nachricht aus der ausgewählten Liste entfernen
      setSelectedNews(selectedNews.filter((item) => item !== newsItem));
      // Nachricht wieder zur Auswahl hinzufügen
      setAvailableNews([...availableNews, newsItem]);
    };
  
    return (
      <GeneralLayout
        step={1}
        question="Welche Nachrichten schaust du so neben dem Studium?"
        component_one={<SelectNews availableNews={availableNews} onSelect={handleSelect} />}
        component_two={<SelectedNewsList selectedNews={selectedNews} onRemove={handleRemove} />}
        nextRoute="/setInterests"
      />
    );
  }

  export default SetNews;