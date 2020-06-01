import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => {
  return(
  <button onClick={onClick}>
    {text}
  </button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <p>No feedback given</p>
    )
  }
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * (-1)) / all
  const positive = good / all * 100 + "%"

  return(
    <table>
      <tbody> 
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>
    
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={clickGood} text={'good'}/>
      <Button onClick={clickNeutral} text={'neutral'}/>
      <Button onClick={clickBad} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App/>,
document.getElementById('root')
)
