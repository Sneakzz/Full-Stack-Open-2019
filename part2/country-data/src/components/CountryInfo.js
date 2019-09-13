import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState([]);

  const languages = country.languages.map(language =>
    <li key={language.name}>
      {language.name}
    </li>
  );
  const flagStyle = {
    width: "200px",
    height: "150px"
  };

  const apiKey = '43868fe988a12e13e6211960074ef191';
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${apiKey}`)
      .then(res => setWeatherInfo(res.data));
  }, [country.capital]);

  if (weatherInfo.length === 0) {
    return (
      <div>loading weather data...</div>
    )
  }

  return (
    <div>
      <br />
      <h2>{country.name}</h2>

      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>

      <h3>languages</h3>
      <ul>
        {languages}
      </ul>

      <img src={country.flag} alt={country.name + ' flag'} style={flagStyle} />

      <h3>Weather in {country.capital}</h3>
      <div>
        <b>temperature: </b> {weatherInfo.main.temp} Celsius
      </div>
      <div>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={weatherInfo.weather[0].description} />
      </div>
      <div>
        <b>wind:</b> {weatherInfo.wind.speed} kph, direction {weatherInfo.wind.deg} degrees
      </div>
    </div>
  )
};

export default CountryInfo;