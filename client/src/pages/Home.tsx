import React from 'react'
import NavBar from '../Components/NavBar'
import Filters from '../Components/Filters'
import Map from '../Components/Map'
import StateList from '../Components/StateList'

const Home = () => {
  return (
    <div>
        <NavBar />
        <Filters />
        <div className='content'>
          <StateList />
          <Map />
        </div>
    </div>

  )
}

export default Home