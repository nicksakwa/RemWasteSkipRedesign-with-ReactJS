// src/App.js
import React, { useState, useEffect } from 'react';
import styles from './App.module.css'; // For overall app styling
import SkipGrid from './components/SkipGrid/SkipGrid'; // We'll create this soon

function App() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSkips(data.data.skips); // Assuming 'data.data.skips' is where the array of skips resides based on typical API responses
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []); // Empty dependency array means this runs once on component mount

  const handleSelectSkip = (id) => {
    setSelectedSkipId(id);
  };

  if (loading) {
    return <div className={styles.container}>Loading skips...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        {/* You can build out the progress steps here later */}
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
          <p>No skip options available for this location.</p>
        )}
      </main>

      <footer className={styles.footer}>
        <button className={styles.backButton}>Back</button>
        <button
          className={styles.continueButton}
          disabled={!selectedSkipId} // Disable if no skip is selected
        >
          Continue &rarr;
        </button>
      </footer>
    </div>
  );
}

export default App;