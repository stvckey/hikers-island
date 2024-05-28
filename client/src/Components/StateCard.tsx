import React from 'react';
import { Park } from '../types';

interface StateCardProps {
  park: Park;
  onClick: () => void;
}

const StateCard: React.FC<StateCardProps> = ({ park, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px' }}>
      <h3>{park.name}</h3>
      <p>{park.description}</p>
    </div>
  );
}

export default StateCard;
