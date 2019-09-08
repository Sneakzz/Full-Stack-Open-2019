import React from 'react';

const Total = ({ parts }) => {
  let initialValue = 0;
  const total = parts.reduce((total, currentValue) => total + currentValue.exercises, initialValue);

  const bold = {
    fontWeight: 'bold'
  };

  return (
    <div>
      <p style={ bold }>total of {total} exercises</p>
    </div>
  )
};

export default Total;