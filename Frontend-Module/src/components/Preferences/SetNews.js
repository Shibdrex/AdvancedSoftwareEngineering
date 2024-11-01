import React from 'react';
import GeneralLayout from './GeneralLayout';
import SelectedNewsChip from './PrefComponents/NewsPreference/SelectedNewsChips';
import NewsField from './PrefComponents/NewsPreference/NewsField';
import { useNewsManagement } from '../../services/designFunctions';

function SetNews({isTutorialCompleted}) {
  const { availableNews, selectedNews, handleSelect, handleRemove } = useNewsManagement();

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