import { useState, useEffect } from 'react'

function Form() {
  const [stateData, setStateData] = useState({ state: ''});
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  
  const fetchOptions = async () => {
    try {
      const response = await fetch('/options.json');
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleInputChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected option:', selectedOption);
  };



  const [data, setData] = useState({})
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async ()=>{
    try{
      const response = await fetch('http://127.0.0.1:5000/')
      const jsonData = await response.json();
      setData(jsonData)
    } catch(error){
      console.log('Error', error)
    }
  }

  const total_states = data["total_states"]
  console.log(total_states)

  let count = 0;
  for (let states in total_states){
    count++
  }

  const choices = []

  for (let i = 0; i < count; i++) {
    const choice = 
      <li><a 
            onClick={handleInputChange}
            id="chosen_state" 
            class="dropdown-item" 
            value={total_states[i][1]}
          >
        {total_states[i][1]}
        </a>
      </li>;
    choices.push(choice);
  }






  return (
    <div className = "filters">

      <form onSubmit={handleSubmit}>
        <button type="button" 
                onChange={handleInputChange}
                class="states-menu-btn btn btn-md rounded-pill overflow-auto dropdown-toggle" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">State</button>
        <ul class="states-menu dropdown-menu rounded-3 border border-success overflow-auto ">
            {choices}
        </ul> 

      <button 
        type="button" 
        name="selection"
        class="states-menu-btn btn btn-md rounded-pill overflow-auto dropdown-toggle" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
        value={stateData.selection} 
        onChange={handleInputChange}>
            Radius
      </button>       
        <ul class="radius-menu rounded-3 border border-success dropdown-menu">
          <li><a class="dropdown-item" value="10">10 mi.</a></li>
          <li><a class="dropdown-item" value="20">15 mi.</a></li>
          <li><a class="dropdown-item" value="10">35 mi.</a></li>
          <li><a class="dropdown-item" value="50+">50+ mi.</a></li>
        </ul> 
      </form>

    </div>

  );
}

export default Form;
