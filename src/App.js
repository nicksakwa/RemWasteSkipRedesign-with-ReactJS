import React,{useState, useEffect} from 'react';
import styles from '.App.module.css';
import SkipGrid from './components/SkipGrid/SkipGrid';


function App() {
  const [skips, setSkip]=useState([]);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const [selectedSkipId,setSelectedSkipId]=useState(null);

  useEffect(()=>{
    const fetchSkips= async()=>{
      try{
        const response= await fetch('https://clicks.aweber.com/y/ct/?l=C90vKn&m=8kKiA5Xs4lyuOBlr&b=LN4zdPOCY2wffjE5vH.B0w');
        if(!response.ok){
          throw new Error('HTTP error! status: ${response.status}');
        }
        const data= await response.json();
        setSkips(data.data.skips);
      } catch (e){
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSkips();
  },[]);

  const handleSelectedSkip=(id)=>{
    setSelectedSkipId();  
  };
  if(loading){
    return <div className={styles.container}>Loading Skips</div>
  }
  if (error){
    return <div className={styles.container}>Error:{error.message}</div>
  }
  return(
    <div className={styles.appContainer}>
      <header className={styles.header}>
          <h1 className={styles.pageTitle}>Choose your skip size</h1>
          <p className={styles.subtitle}>Selected the skip size that best suits your needs</p>
      </header>
      <main className={styles.mainContent}>
        {skips.length>0?(
          <SkipGrid
           skips={Skips}
           selectedSkipId={selectedSkipId}
           onSelectedSkip={handleSelectedSkip}
           />
        ):(
          <p>No skip options available for this location.</p>
        )}
      </main>

      <footer className={styles.footer}>
        <button className={styles.backButton}>Back</button>
        <button 
            className={styles.continueButton}
            disabled={!selectedSkipId}
        >
          Continue &rarrr;
        </button>
      </footer>
    </div>
  );
}

export default App;
