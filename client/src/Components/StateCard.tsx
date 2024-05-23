import React from 'react'
import httpClient from '../httpClient';
import { Park } from "../types";


interface StateCardProps {
  park: Park; // Use Park type for park prop
}

const StateCard: React.FC<StateCardProps> = ({ park }) => {
  return (
    <div className="state-card">
      <h3>{park.name}</h3>
      <p>Description: {park.description}</p>
      {/* Render other park information as needed */}
    </div>
  );
}

export default StateCard;