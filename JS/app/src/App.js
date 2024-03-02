import React, { useState, useEffect } from 'react';
import Body from './Body';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary'
import './styles/App.css';

const App = () => {
  const [atmData, setAtmData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:24110/api/get_atms');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAtmData(data);
      } catch (error) {
        console.error('Error fetching ATM data:', error);
        setError('Failed to fetch data. Please check your network connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <Body atmData={atmData} />
      </ErrorBoundary>
     
    </div>
  );
};

export default App;
