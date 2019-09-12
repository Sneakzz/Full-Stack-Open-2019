import React from 'react';

const CountryInfo = ({ country }) => {
  const languages = country.languages.map(language =>
    <li key={language.name}>
      {language.name}
    </li>
  );
  const flagStyle = {
    width: "150px",
    height: "150px"
  };

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
    </div>
  )
};

export default CountryInfo;