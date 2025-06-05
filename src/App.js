// src/App.js
import React, { useState, useEffect } from 'react';
import styles from './App.module.css'; // For overall app layout and main styles
import SkipGrid from './components/SkipGrid/SkipGrid'; // Component to display the grid of skips
import ProgressBar from './components/ProgressBar/ProgressBar'; // Component for the step-by-step progress indicator

function App() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  // Define the current step for the progress bar.
  // 'Select Skip' is typically the 3rd step in this flow (Postcode, Waste Type, Select Skip).
  const currentStep = 3;

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');

        if (!response.ok) {
          // Throw an error for bad HTTP responses (4xx, 5xx)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // 'data' will now directly be the array of skip objects

        // --- IMPORTANT FIX HERE ---
        // Based on the JSON response you provided, the API returns an array directly.
        // So, we set the 'skips' state directly to the 'data' array.
        setSkips(data);
        // --- END FIX ---

      } catch (e) {
        // Catch any network errors or errors thrown above
        setError(e);
        console.error("Failed to fetch skips:", e);
      } finally {
        // Ensure loading state is always set to false after fetch attempt
        setLoading(false);
      }
    };

    fetchSkips();
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  /**
   * Handles the selection of a skip. This function is passed down to SkipGrid and then to SkipCard.
   * @param {string | number} id - The ID of the selected skip.
   */
  const handleSelectSkip = (id) => {
    setSelectedSkipId(id);
  };

  // --- Conditional Rendering based on fetch state ---

  if (loading) {
    return (
      <div className={styles.statusContainer}>
        <p>Loading skip options...</p>
        {/* You could add a simple spinner here */}
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

  // --- Main App Layout ---
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        {/* Progress Bar for navigation steps */}
        <ProgressBar currentStep={currentStep} />

        {/* Page Title and Subtitle */}
        <h1 className={styles.pageTitle}>Choose Your Skip Size</h1>
        <p className={styles.subtitle}>Select the skip size that best suits your needs</p>
      </header>

      <main className={styles.mainContent}>
        {skips.length > 0 ? (
          // Render the SkipGrid if skips data is available
          <SkipGrid
            skips={skips}
            selectedSkipId={selectedSkipId}
            onSelectSkip={handleSelectSkip} // Pass the handleSelectSkip function as a prop
          />
        ) : (
          // Message if no skips are found after successful fetch
          <p className={styles.noSkipsMessage}>No skip options available for this location at the moment. Please try a different postcode.</p>
        )}
      </main>

      <footer className={styles.footer}>
        {/* Back Button */}
        <button className={styles.backButton}>Back</button>

        {/* Continue Button - disabled if no skip is selected */}
        <button
          className={styles.continueButton}
          disabled={!selectedSkipId} // Button is disabled if selectedSkipId is null
        >
          Continue &rarr;
        </button>
      </footer>
    </div>
  );
}

export default App;