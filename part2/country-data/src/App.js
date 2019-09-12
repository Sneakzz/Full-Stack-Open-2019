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

  // const renderCountries = () => {
  //   const filteredCountries = countries.filter(country => {
  //     return country.name.toLowerCase().includes(countryName.toLowerCase());
  //   });

  //   if (filteredCountries.length > 10) {
  //     return (
  //       <div>
  //         Too many matches, specify another filter
  //       </div>
  //     )
  //   }

  //   if (filteredCountries.length > 1) {
  //     return (
  //       filteredCountries.map(country =>
  //         <div key={country.numericCode}>
  //           {country.name}
  //         </div>
  //       )
  //     )
  //   }

  //   if (filteredCountries.length === 1) {
  //     const country = filteredCountries[0];
  //     const languages = country.languages.map(language =>
  //       <li key={language.name}>
  //         {language.name}
  //       </li>
  //     )
  //     const flagStyle = {
  //       width: '150px',
  //       height: '150px'
  //     };

  //     return (
  //       <div>
  //         <br />
  //         <h2>{country.name}</h2>

  //         <div>
  //         capital {country.capital}
  //         </div>
  //         <div>
  //         population {country.population}
  //         </div>

  //         <h3>languages</h3>
  //         <ul>
  //           {languages}
  //         </ul>

  //         <img src={country.flag} alt={country.name + 'flag'} style={flagStyle}></img>
  //       </div>
  //     )
  //   }
  // }

  return (
    <div>
      <Filter value={countryName} onChange={countryNameChangeHandler} />
      
      <CountriesRenderer countries={countries} countryName={countryName} />
    </div>

  )
}

export default App;