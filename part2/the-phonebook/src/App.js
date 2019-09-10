import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const personObj = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObj));
    setNewName('');
    setNewNumber('');
  };

  const newNameChange = event => {
    setNewName(event.target.value);
  }

  const newNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const renderPersons = () => persons.map(person =>
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={newNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {renderPersons()}
    </div>
  )
};

export default App;