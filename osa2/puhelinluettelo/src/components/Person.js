import React from 'react'

const Person = ({ person, handleDelete}) => {
    return (
      <div>
        <p>{person.name} {person.number}</p>
        <button onClick={(event) => handleDelete(person, event)}>delete</button>
      </div>
      
    )
  }
  
  const Persons = ({ personsToShow, handleDelete }) => {
    return(
      <div>{personsToShow.map(person => <Person person={person} key={person.name} handleDelete={handleDelete}/>)}</div>
    )
  }

  export default Persons