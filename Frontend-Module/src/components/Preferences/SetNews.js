import React, { useState } from 'react';
import GeneralLayout from './GeneralLayout';
import SelectedNewsChip from './PrefComponents/NewsPreference/SelectedNewsChips';
import NewsField from './PrefComponents/NewsPreference/NewsField';

function SetNews({isTutorialCompleted}) {
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

    const nextRoute = isTutorialCompleted ? '/home' : '/setInterests';

    return (
      <div className='content'>
      <GeneralLayout
        step={1}
        question="Welche Nachrichten schaust du so neben dem Studium?"
        component_one={<SelectedNewsChip selectedNews={selectedNews} onRemove={handleRemove} />}
        component_two={<NewsField availableNews={availableNews} onSelect={handleSelect} />}
        nextRoute={nextRoute}
        isTutorialCompleted={isTutorialCompleted}
      />
      </div>
    );
  }

  export default SetNews;