import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountriesRenderer from './components/CountriesRenderer';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const countryNameChangeHandler = e => {
    setCountryName(e.target.value);
  }

  return (
    <div>
      <Filter
        value={countryName} 
        onChange={countryNameChangeHandler} 
      />
      
      <CountriesRenderer 
        countries={countries} 
        countryName={countryName}
        setCountryName={setCountryName}
      />
    </div>

  )
}

export default App;