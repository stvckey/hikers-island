import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StateCard from './StateCard'; // Import StateCard component
import { Park } from '../types'; // Import Park interface

interface StateListProps {
  selectedState: string;
}

const StateList: React.FC<StateListProps> = ({ selectedState }) => {
  const [parks, setParks] = useState<Park[]>([]); // Use Park[] type for parks state

  useEffect(() => {
    const fetchParksByState = async () => {
      try {
        if (selectedState) {
          const response = await axios.post("http://localhost:5000/search_by_state", {
            state: selectedState,
          });
          setParks(response.data);
        }
      } catch (error) {
        console.error('Error fetching parks:', error);
      }
    };

    fetchParksByState();
  }, [selectedState]);

  return (
    <div>
      {selectedState ? (
        <div>
          <h2>Parks in {selectedState}</h2>
          <div className="park-cards">
            {parks.map(park => (
              <StateCard key={park.park_id} park={park} />
            ))}
          </div>
        </div>
      ) : (
        <p>Please select a state to view the parks.</p>
      )}
    </div>
  );
}

export default StateList;
