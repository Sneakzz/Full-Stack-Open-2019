import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const Anecdote = ({text, votes}) => (
  <div>
    <div>
      {text}
    </div>
    <div>
      has {votes} votes
    </div>
  </div>
)

const TopAnecdote = ({anecdotes, votes}) => {
  let topVotedIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
        {anecdotes[topVotedIndex]}
      </div>
      <div>
        has {votes[topVotedIndex]} votes
      </div>
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextBtn = () => {
    let randNum = Math.floor((Math.random() * anecdotes.length))
    if (randNum === selected) {
      randNum = Math.floor((Math.random() * anecdotes.length))
    }

    setSelected(randNum)
  }

  const handleVoteBtn = () => {
    const copy = [...votes]
    copy[selected] += 1

    setVotes(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVoteBtn} text="vote" />
      <Button onClick={handleNextBtn} text="next anecdote" />

      <Header text="Anecdote with most votes" />
      <TopAnecdote anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
