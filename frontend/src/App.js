import { useState, useEffect } from 'react'
import './theme.css';
import Info from './Info';
import Form from './components/Form.js'
import Card from './components/Card'
import MapComponent from "./Map.jsx"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import park_data from './park_info.json';


function App() {
  return (
<div className="body">

<div className = "header">
  <h1 className = "logo"> 
    HIKEU 
  </h1>
  <div className = "profile">
  </div>
</div>

<div className="filters">
  <Form />
</div>

<div className="page">

  <div class="content shadow shadow-offset-left-xl">
    <div class ="results">

      <Info />

    </div>
    
  </div>

<div class="map">
  <MapComponent/>
</div>
</div>


<div class = "feed shadow-lg">
  <h1 class="feed-info-box">The feed will go here!</h1>
  <h1 class="feed-info-box">The feed will go here!</h1>
  <h1 class="feed-info-box">The feed will go here!</h1>
  <h1 class="feed-info-box">The feed will go here!</h1>
</div>


</div>
  );
}

export default App;
