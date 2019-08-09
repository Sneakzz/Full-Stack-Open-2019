import React from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by
      <a href="https://github.com/Sneakzz">Kenny</a>
    </div>
  )
}

// This is a React Component called "App"
const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    // use the empty tags to avoid having "extra" div's in the DOM tree
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
