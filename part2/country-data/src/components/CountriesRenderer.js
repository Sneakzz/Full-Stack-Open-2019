import React from 'react';
import CountryInfo from './CountryInfo';
import Country from './Country';

const listToBig = () => {
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
};

const listSizeGood = (countryList, setCountryName) => {
  return (
    countryList.map(country =>
      <Country 
        key={country.numericCode} 
        country={country} 
        setCountryName={setCountryName} 
      />
    )
  )
};

const justOne = country => {
  return (
    <CountryInfo country={country} />
  )
};

const CountriesRenderer = ({ countries, countryName, setCountryName }) => {
  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(countryName.toLowerCase());
  });

  if (filteredCountries.length > 10) return listToBig()


  if (filteredCountries.length > 1) return listSizeGood(filteredCountries, setCountryName);

  if (filteredCountries.length === 1) return justOne(filteredCountries[0]);

  // if this executes, it means no countries are in the list
  return (<div>No countries found</div>)
};

export default CountriesRenderer;