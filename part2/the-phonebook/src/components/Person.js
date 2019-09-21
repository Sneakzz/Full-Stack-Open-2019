import React from 'react';

const Person = ({ person, deleteHandler }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deleteHandler(person.id)}>delete</button>
    </div>
  )
};

export default Person;