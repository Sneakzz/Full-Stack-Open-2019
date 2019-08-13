import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = (good - bad) / total
  let percentPositive = (good / total) * 100 + ' %'

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return(
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={total} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={percentPositive} />
        </tbody>
      </table>
    )
  }
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleBtn = (e) => {
    switch (e.target.innerText) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      case 'bad':
        setBad(bad + 1)
        break
      default:
        break
    }
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={handleBtn} text='good' />
      <Button onClick={handleBtn} text='neutral' />
      <Button onClick={handleBtn} text='bad' />

      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
