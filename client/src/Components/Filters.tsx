import React from 'react';
import { FiltersProps } from '../types';

export const Filters: React.FC<FiltersProps> = ({ states, onStateSelect }) => {
  const [selectedState, setSelectedState] = React.useState<string>('');

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    onStateSelect(state);
  };

  return (
    <div className='filters'>
      <form>
        <button type="button" 
                className="states-menu-btn btn btn-md rounded-pill overflow-auto dropdown-toggle" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">State</button>
        <ul className="states-menu dropdown-menu rounded-3 border border-success overflow-auto scrollable-dropdown">
          {states.map(state => (
            <li key={state}>
              <a className="dropdown-item" onClick={() => handleStateSelect(state)}>{state}</a>
            </li>
          ))}
        </ul> 

        <button 
          type="button" 
          name="selection"
          className="states-menu-btn btn btn-md rounded-pill overflow-auto dropdown-toggle" 
          data-bs-toggle="dropdown" 
          aria-expanded="false">
            Radius
        </button>       
        <ul className="radius-menu rounded-3 border border-success dropdown-menu scrollable-dropdown">
          <li><a className="dropdown-item">10 mi.</a></li>
          <li><a className="dropdown-item">15 mi.</a></li>
          <li><a className="dropdown-item">35 mi.</a></li>
          <li><a className="dropdown-item">50+ mi.</a></li>
        </ul> 
      </form>
    </div>
  );
}

export default Filters;