import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter, deleteHandler }) => {
  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().startsWith(filter.toLowerCase());
  });

  return (
    filteredPersons.map(person => 
      <Person key={person.id} person={person} deleteHandler={deleteHandler} />
    )
  )
};

export default Persons;