import React, { useState, useEffect } from 'react';
import styles from './App.module.css'; 
import SkipGrid from './components/SkipGrid/SkipGrid'; 
import ProgressBar from './components/ProgressBar/ProgressBar'; 
function App() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  const currentStep = 3;
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); 
        setSkips(data);
        } catch (e) {
        setError(e);
        console.error("Failed to fetch skips:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSkips();
  }, []); 

  /**
   * Handles the selection of a skip. This function is passed down to SkipGrid and then to SkipCard.
   * @param {string | number} id - The ID of the selected skip.
   */
  const handleSelectSkip = (id) => {
    setSelectedSkipId(id);
  };
  if (loading) {
    return (
      <div className={styles.statusContainer}>
        <p>Loading skip options...</p>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.statusContainer}>
        <p>Error loading data: {error.message}</p>
        <p>Please try again later or check your internet connection.</p>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <ProgressBar currentStep={currentStep} />
        <h1 className={styles.pageTitle}>Choose Your Skip Size</h1>
        <p className={styles.subtitle}>Select the skip size that best suits your needs</p>
      </header>
      <main className={styles.mainContent}>
        {skips.length > 0 ? (
          <SkipGrid
            skips={skips}
            selectedSkipId={selectedSkipId}
            onSelectSkip={handleSelectSkip} 
          />
        ) : (
          <p className={styles.noSkipsMessage}>No skip options available for this location at the moment. Please try a different postcode.</p>
        )}
      </main>

      <footer className={styles.footer}>
        <button className={styles.backButton}>Back</button>
        <button
          className={styles.continueButton}
          disabled={!selectedSkipId} 
        >
          Continue &rarr;
        </button>
      </footer>
    </div>
  );
}

export default App;