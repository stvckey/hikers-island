import React from 'react';
import Map from './Map';
import StateList from './StateList';

interface ContentProps {
  selectedState: string;
}

const Content: React.FC<ContentProps> = ({ selectedState }) => {
  return (
    <div className='content'>
      <StateList selectedState={selectedState} />
      <Map />
    </div>
  );
}

export default Content;
