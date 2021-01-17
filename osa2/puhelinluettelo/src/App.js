import React, {useState, useEffect} from 'react';
import service from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import Notification from  './components/Notification'


const App = () => {

  const [ persons, setPersons ] = useState([])

  const hook = () => {
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState('')
  const [showMessage, setShowMessage ] = useState(false)
  const [ errorColor, setErrorColor] = useState(false)

  const names = persons.map(person => person.name)

  const addPerson = (event) => {
    event.preventDefault()
    if(names.includes(newName)){
      const existingPerson = persons.find(p => p.name===newName)
      const updatedPerson = {...existingPerson, number:newNumber}
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        service
        .update(existingPerson.id, updatedPerson)
        .catch(error => {
          setErrorColor(true)
          setMessage(
            `Information of ${existingPerson.name} has already been removed from server`
          )
        })

        setPersons(persons.map(person => person.id !== existingPerson.id? person : updatedPerson))
        setErrorColor(false)
        setShowMessage(true)
        setMessage(
          `Changed ${existingPerson.name}'s number`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }

    service
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      setErrorColor(false)
      setShowMessage(true)
      setMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } 
  }


  const handleDelete = (person, event) => {
    event.preventDefault()
    if(window.confirm(`Delete ${person.name} ?`)){
      service
        .deleteOne(person.id)
      const remainingPersons = persons.filter(p => p.id!==person.id)
      setPersons(remainingPersons)
      setErrorColor(false)
      setShowMessage(true)
      setMessage(
        `Deleted ${person.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {showMessage ? <Notification message={message} messageColor={errorColor ? 'red' : 'green' } /> : null }
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} 
                  newNumber={newNumber} handleNumberChange={handleNumberChange}
                  addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;
