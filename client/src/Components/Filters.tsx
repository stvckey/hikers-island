import React from 'react'

export const Filters = () => {
  return (
    <div className='filters'>
      <form>
        <button type="button" 
                className="states-menu-btn btn btn-md rounded-pill overflow-auto dropdown-toggle" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">State</button>
        <ul className="states-menu dropdown-menu rounded-3 border border-success overflow-auto ">
        </ul> 

      <button 
        type="button" 
        name="selection"
        className="states-menu-btn btn btn-md rounded-pill overflow-auto dropdown-toggle" 
        data-bs-toggle="dropdown" 
        aria-expanded="false">
            Radius
      </button>       
        <ul className="radius-menu rounded-3 border border-success dropdown-menu">
          <li><a className="dropdown-item">10 mi.</a></li>
          <li><a className="dropdown-item">15 mi.</a></li>
          <li><a className="dropdown-item">35 mi.</a></li>
          <li><a className="dropdown-item">50+ mi.</a></li>
        </ul> 
      </form>
    </div>
  )
}

export default Filters;