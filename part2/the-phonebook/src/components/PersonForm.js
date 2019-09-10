import React from 'react';

const PersonForm = ({ handlers }) => {
  return (
    <form onSubmit={handlers.onSubmit}>
      <div>
        name: <input value={handlers.nameValue} onChange={handlers.nameChange} />
      </div>
      <div>
        number: <input value={handlers.numberValue} onChange={handlers.numberChange} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
};

export default PersonForm;