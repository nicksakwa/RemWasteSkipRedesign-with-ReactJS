// src/components/SkipGrid/SkipGrid.js
import React from 'react';
import SkipCard from '../SkipCard/SkipCard';
import styles from './SkipGrid.module.css';

const SkipGrid = ({ skips, selectedSkipId, onSelectSkip }) => { // <-- Ensure onSelectSkip is destructured here
  return (
    <div className={styles.gridContainer}>
      {skips.map((skip) => (
        <SkipCard
          key={skip.id} // Essential for React list rendering performance and stability
          skipData={skip} // Pass the entire skip object to SkipCard
          isSelected={skip.id === selectedSkipId} // Check if this card's ID matches the selected ID
          onSelectSkip={onSelectSkip} // <-- Pass the onSelectSkip function down to SkipCard
        />
      ))}
    </div>
  );
};

export default SkipGrid;