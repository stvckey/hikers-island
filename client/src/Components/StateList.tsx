import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StateCard from './StateCard'; // Import StateCard component
import { Park } from '../types'; // Import Park interface

interface StateListProps {
  selectedState?: string;
  onParkClick: (index: number) => void; // Callback to handle park clicks
}

const StateList: React.FC<StateListProps> = ({ selectedState, onParkClick }) => {
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    const fetchParksByState = async () => {
      if (selectedState) {
        try {
          const response = await axios.post("http://localhost:5000/search_by_state", {
            state: selectedState,
          });
          setParks(response.data);
        } catch (error) {
          console.error('Error fetching parks:', error);
        }
      }
    };

    fetchParksByState();
  }, [selectedState]);

  return (
    <div>
      <h2>Parks in {selectedState}</h2>
      <div className="park-cards">
        {parks.map((park, index) => (
          <StateCard key={park.park_id} park={park} onClick={() => onParkClick(index)} />
        ))}
      </div>
    </div>
  );
}

export default StateList;
