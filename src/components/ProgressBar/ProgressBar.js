import React from 'react';
import styles from './ProgressBar.module.css';

import{
  FaMapMarkerAlt,
  FaRecycle,
  FaTruckLoading,
  FaClipboardCheck,
  FaCalendarAlt,
  FaCreditCard
}from 'react-icons/fa';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { name: 'Postcode',     id: 1, icon:<FaMapMarkerAlt/> },
    { name: 'Waste Type',   id: 2, icon:<FaRecycle/> },
    { name: 'Select Skip',  id: 3, icon:<FaTruckLoading/> },
    { name: 'Permit Check', id: 4, icon:<FaClipboardCheck/> },
    { name: 'Choose Date',  id: 5, icon:<FaCalendarAlt/> },
    { name: 'Payment',      id: 6, icon:<FaCreditCard/> },
  ];

  return (
    <nav className={styles.progressBar}>
      <div className={styles.connectorLine}></div>
      {steps.map((step) => (
        <div
          key={step.id}
          className={`${styles.step} ${step.id <= currentStep ? styles.active : ''}`}
        >
          <div className={styles.iconWrapper}>{step.icon}</div>
          <span className={styles.stepName}>{step.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default ProgressBar;