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
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    PersonService.getAll()
      .then(persons => {
        setPersons(persons);
      });
  }, []);

  const addPerson = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name === newName);
      const changeNr = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

      if (changeNr) {
        numberChange(person);
      }
      
      return;
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
        setNotification(`Added ${personObj.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  const numberChange = person => {
    const changedPerson = {...person, number: newNumber};
    const id = person.id;

    PersonService
      .update(id, changedPerson)
      .then(newPerson => {
        setPersons(persons.map(person => person.id !== id ? person : newPerson));
        setNewName('');
        setNewNumber('');
        setNotification(`Number changed from ${person.number} to ${changedPerson.number} for ${person.name}.`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  }

  const deletePerson = id => {
    const personToDel = persons.find(p => p.id === id);
    const answer = window.confirm(`Delete ${personToDel.name} ?`);

    if (answer) {
      PersonService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.log('Something went wrong deleting a person from the phonebook');
        });
    }
  }

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

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter value={filter} onChange={filterChange} />

      <h3>Add a new</h3>

      <PersonForm handlers={personFormHandlers} />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} deleteHandler={deletePerson} />
    </div>
  )
};

export default App;