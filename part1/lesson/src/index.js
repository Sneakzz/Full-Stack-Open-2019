import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

// This is a React Component called "App"
const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

// example of how to use hooks like useState and useEffect
const App2 = (props) => {
  // this is ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if (age > 10) {
    // This does not work
    // const [foobar, setFoobar] = useState(null)
  }

  for (let i = 0; i < age; i++) {
    // also this is not good
    // const [rightWay, setRightway] = useState(false)
  }

  const notGood = () => {
    // and this is also not good
    // const [x, setX] = useState(-1000)
  }

  return (
    <div>
      example of how to correctly use React hooks
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
