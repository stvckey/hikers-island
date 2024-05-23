import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Filters from '../Components/Filters';
import Content from '../Components/Content';
import httpClient from '../httpClient'; // Make sure this path is correct

const Home: React.FC = () => {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

  useEffect(() => {
    httpClient.get('http://localhost:5000/all_states')
      .then(response => {
        const sortedStates = response.data.sort((a: string, b: string) => a.localeCompare(b));
        setStates(sortedStates);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  const handleStateSelect = (selectedState: string) => {
    setSelectedState(selectedState);
  };

  return (
    <div>
      <NavBar />
      <Filters states={states} onStateSelect={handleStateSelect} />
      <Content selectedState={selectedState} />
    </div>
  );
}

export default Home;
