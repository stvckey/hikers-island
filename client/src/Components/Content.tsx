import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from './Map';
import StateList from './StateList';
import { Park } from '../types';

interface ContentProps {
  selectedState: string;
}

const Content: React.FC<ContentProps> = ({ selectedState }) => {
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const [parkNames, setParkNames] = useState<string[]>([]);
  const [selectedPark, setSelectedPark] = useState<number | null>(null);

  useEffect(() => {
    const fetchParksByState = async () => {
      try {
        const response = await axios.post("http://localhost:5000/search_by_state", {
          state: selectedState,
        });
        const parks: Park[] = response.data;
        const parkCoordinates: [number, number][] = parks.map(park => [park.lat, park.long]);
        const parkNames: string[] = parks.map(park => park.name);
        setCoordinates(parkCoordinates);
        setParkNames(parkNames);
      } catch (error) {
        console.error('Error fetching park data:', error);
      }
    };

    fetchParksByState();
  }, [selectedState]);

  return (
    <div className='content'>
      <StateList selectedState={selectedState} onParkClick={setSelectedPark} />
      <Map coordinates={coordinates} parkNames={parkNames} selectedPark={selectedPark} />
    </div>
  );
}

export default Content;
