import React from 'react';

const Country = ({ country, setCountryName }) => {
  return (
    <div>
      {country.name}
      <button onClick={() => setCountryName(country.name)}>show</button>
    </div>
  )
};

export default Country;