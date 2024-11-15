import React, { useState } from 'react';
import GeneralLayout from './GeneralLayout';
import SelectedNewsChip from './PrefComponents/NewsPreference/SelectedNewsChips';
import NewsField from './PrefComponents/NewsPreference/NewsField';
import { useNewsManagement } from '../../utils/designFunctions';


function SetNews({ isTutorialCompleted }) {
  const newsManagement = useNewsManagement();
  
  const nextRoute = isTutorialCompleted ? '/home' : '/setInterests';

  // Prüfen, ob NewsField leer ist (keine verfügbaren Nachrichten)
    console.log(newsManagement.selectedNews)
  const isComponentTwoEmpty = newsManagement.selectedNews.length === 0;

  return (
    <div className="content">
      <GeneralLayout
        step={2}
        type={"news"}
        hook={newsManagement}
        question="Welche Nachrichten schaust du so neben dem Studium?"
        component_one={<SelectedNewsChip selectedNews={newsManagement.selectedNews} onRemove={newsManagement.handleRemove} />}
        component_two={<NewsField availableNews={newsManagement.availableNews} onSelect={newsManagement.handleSelect} />}
        nextRoute={nextRoute}
        isTutorialCompleted={isTutorialCompleted}
        isComponentTwoEmpty={isComponentTwoEmpty}  // Übergebe den Status von NewsField
      />
    </div>
  );
}

export default SetNews;
