// src/components/SkipCard/SkipCard.js
import React from 'react';
import styles from './SkipCard.module.css';

const SkipCard = ({ skipData, isSelected, onSelectSkip }) => {
  const { id, size, hirePeriod, price, imageUrl } = skipData; // Assume these properties from API

  const handleClick = () => {
    onSelectSkip(id);
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      <div className={styles.imageContainer}>
        {/* Placeholder image or actual image from API */}
        <img src={imageUrl || 'https://via.placeholder.com/200x150?text=Skip'} alt={`${size} Yard Skip`} className={styles.skipImage} />
      </div>
      <h3 className={styles.skipSize}>{size} Yard Skip</h3>
      <p className={styles.hirePeriod}>{hirePeriod} hire period</p>
      <div className={styles.price}>£{price}</div>
      <button
        className={`${styles.selectButton} ${isSelected ? styles.buttonSelected : ''}`}
        onClick={handleClick}
      >
        {isSelected ? 'Selected' : 'Select This Skip'}
      </button>
    </div>
  );
};

export default SkipCard;