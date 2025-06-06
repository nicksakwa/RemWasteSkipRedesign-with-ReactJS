import React from 'react';
import SkipCard from '../SkipCard/SkipCard';
import styles from './SkipGrid.module.css';

const SkipGrid = ({ skips, selectedSkipId, onSelectSkip }) => { 
  return (
    <div className={styles.gridContainer}>
      {skips.map((skip) => (
        <SkipCard
          key={skip.id} 
          skipData={skip} 
          isSelected={skip.id === selectedSkipId} 
          onSelectSkip={onSelectSkip} 
        />
      ))}
    </div>
  );
};

export default SkipGrid;