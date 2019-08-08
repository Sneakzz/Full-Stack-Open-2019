import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
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
