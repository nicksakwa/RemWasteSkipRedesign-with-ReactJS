import React from 'react';
import styles from './SkipCard.module.css';

const SkipCard = ({ skipData, isSelected, onSelectSkip }) => {
  const { id, size, hire_period_days, price_before_vat, vat } = skipData;
  const finalPrice = (price_before_vat * (1 + (vat / 100))).toFixed(0); 
  const handleClick = () => {
    onSelectSkip(id);
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      <div className={styles.imageContainer}>
       <img
          src={`https://via.placeholder.com/200x150?text=${size}Y+Skip`}
          alt={`${size} Yard Skip`}
          className={styles.skipImage}
        />
      </div>
      <h3 className={styles.skipSize}>{size} Yard Skip</h3>
      <p className={styles.hirePeriod}>{hire_period_days} day hire period</p>
      <div className={styles.price}>£{finalPrice}</div> 
      <button
        className={`${styles.selectButton} ${isSelected ? styles.buttonSelected : ''}`}
        onClick={handleClick}
        disabled={isSelected} 
      >
        {isSelected ? 'Selected' : 'Select This Skip'}
      </button>
    </div>
  );
};

export default SkipCard;