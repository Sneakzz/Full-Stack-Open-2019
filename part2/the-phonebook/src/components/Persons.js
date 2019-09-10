import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().startsWith(filter.toLowerCase());
  });

  return (
    filteredPersons.map(person => 
      <Person key={person.name} person={person} />
    )
  )
};

export default Persons;