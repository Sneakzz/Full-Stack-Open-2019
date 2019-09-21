import React, { useState, useEffect } from 'react';
import PersonService from './services/PersonService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    PersonService.getAll()
      .then(persons => {
        setPersons(persons);
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

    PersonService
      .addOne(personObj)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      });
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