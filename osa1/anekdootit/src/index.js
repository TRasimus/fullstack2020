import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const chooseAnecdote = () => {
    const random = Math.floor(Math.random() * Math.floor(6))
    setSelected(random)
  }

  const points = new Array (6 + 1).join('0').split('').map(parseFloat)
  const [votes, setCurrentVotes] = useState(points)

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setCurrentVotes(copy)
  }
  
  const maxVotes = votes.indexOf(Math.max(...votes))
  const bestAnecdote = props.anecdotes[maxVotes]

  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      <Button onClick={vote} text="vote"/>
      <Button onClick={chooseAnecdote} text="new anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{bestAnecdote}</p>
      <p>has {votes[maxVotes]} votes</p>
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
