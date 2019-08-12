import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Outcome = ({text, value}) => (
  <div>
    {text} {value}
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodBtn = () => setGood(good + 1)
  const handleNeutralBtn = () => setNeutral(neutral + 1)
  const handleBadBtn = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGoodBtn} text="good" />
      <Button onClick={handleNeutralBtn} text="neutral" />
      <Button onClick={handleBadBtn} text="bad" />

      <Header text="statistics" />
      <Outcome text="good" value={good} />
      <Outcome text="neutral" value={neutral} />
      <Outcome text="bad" value={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
