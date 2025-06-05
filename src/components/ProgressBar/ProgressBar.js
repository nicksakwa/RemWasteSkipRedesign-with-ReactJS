// src/components/ProgressBar/ProgressBar.js
import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { name: 'Postcode', id: 1 },
    { name: 'Waste Type', id: 2 },
    { name: 'Select Skip', id: 3 },
    { name: 'Permit Check', id: 4 },
    { name: 'Choose Date', id: 5 },
    { name: 'Payment', id: 6 },
  ];

  return (
    <nav className={styles.progressBar}>
      {/* The line connecting the steps */}
      <div className={styles.line}></div>
      {steps.map((step) => (
        <div
          key={step.id}
          className={`${styles.step} ${step.id <= currentStep ? styles.active : ''}`}
        >
          <div className={styles.circle}></div>
          <span className={styles.stepName}>{step.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default ProgressBar;