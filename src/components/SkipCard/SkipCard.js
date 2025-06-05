// src/components/SkipCard/SkipCard.js
import React from 'react';
import styles from './SkipCard.module.css';

const SkipCard = ({ skipData, isSelected, onSelectSkip }) => {
  // Destructure properties from skipData.
  // Note: 'hire_period_days' and 'price_before_vat' from your JSON.
  // We'll calculate the final price (including VAT)
  const { id, size, hire_period_days, price_before_vat, vat } = skipData;

  // Calculate the final price including VAT
  const finalPrice = (price_before_vat * (1 + (vat / 100))).toFixed(0); // Round to nearest whole number for display

  const handleClick = () => {
    onSelectSkip(id);
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      <div className={styles.imageContainer}>
        {/*
          Placeholder image for skips. The API response doesn't provide image URLs.
          In a real app, you'd either have a lookup table based on 'size'
          or the API would include 'imageUrl'.
        */}
        <img
          src={`https://via.placeholder.com/200x150?text=${size}Y+Skip`}
          alt={`${size} Yard Skip`}
          className={styles.skipImage}
        />
      </div>
      <h3 className={styles.skipSize}>{size} Yard Skip</h3>
      <p className={styles.hirePeriod}>{hire_period_days} day hire period</p>
      <div className={styles.price}>£{finalPrice}</div> {/* Display calculated final price */}
      <button
        className={`${styles.selectButton} ${isSelected ? styles.buttonSelected : ''}`}
        onClick={handleClick}
        disabled={isSelected} // Disable button if already selected
      >
        {isSelected ? 'Selected' : 'Select This Skip'}
      </button>
    </div>
  );
};

export default SkipCard;