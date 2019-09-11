import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const addPerson = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    };

    const personObj = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(personObj));
    setNewName('');
    setNewNumber('');
  };

  const newNameChange = event => {
    setNewName(event.target.value);
  };

  const newNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const filterChange = event => {
    setFilter(event.target.value);
  };

  const personFormHandlers = {
    onSubmit: addPerson,
    nameValue: newName,
    nameChange: newNameChange,
    numberValue: newNumber,
    numberChange: newNumberChange
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={filterChange} />

      <h3>Add a new</h3>

      <PersonForm handlers={personFormHandlers} />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  )
};

export default App;