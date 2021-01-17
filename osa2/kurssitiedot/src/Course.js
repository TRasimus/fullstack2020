import React from 'react'

const Course = ({ course }) => {
    const name = course.name
    const parts = course.parts
    return(
      <div>
        <Header course={name}/>
        <Content parts={parts}/>
        <Total parts={parts}/>
      </div>
    )
  }

  const Header = ({ course }) => {
    return(
      <h2>{course}</h2>
    )
  }
  

  const Part = ({ part }) => {
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }
  

  const Content = ({ parts }) => {
    return (
      <div>
      {parts.map(part => <Part part={part} key={part.id}/> )}
      </div>
    )
  }


  const Total = ({ parts }) => {
    const sum = (acc, cur) => acc + cur
    const exercises = parts.map(part => part.exercises)
    return (
      <b>total of {exercises.reduce(sum)} exercises</b>
    )
  }

  export default Course