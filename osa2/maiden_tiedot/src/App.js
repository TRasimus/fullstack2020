import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Search = ({ newSearch, handleSearchChange }) => {

  return(
    <div>
      find countries <input value={newSearch} onChange={handleSearchChange}></input>
    </div>
  )
}

const Country = ({ country, setNewSearch, setCapital}) => {

  return (
    <div>
      {country.name} <button onClick={() => {setNewSearch(country.name) 
        setCapital(country.capital)}} >show</button>
    </div>
  )
}

const Countries = ({ countriesToShow, message, setNewSearch, setCapital }) => {

  if(countriesToShow.length === 1) return null
  
  return(
    <div>
      <div>
      {countriesToShow.map(country => <Country country={country} key={country.numericCode} 
       setNewSearch={setNewSearch} setCapital={setCapital}/>)}
      </div>
      <p>{message}</p>
    </div>
  )
}

const CountryInfo = ({ countriesToShow }) => {

  if (countriesToShow.length > 1) return null

  return(
    <div>{countriesToShow.map(country => 
      <div key={country}>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>Spoken languages</h3>
        <ul>
          {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={country.flag} alt='flag' height='50%' width='50%'></img>
      </div>)}
    </div>
  )
}

const Weather = ({ weather, capital, countriesToShow }) => {

  if(weather === null|| capital === null || countriesToShow.length !== 1) return null

  return(
    <div>
      <h3>Weather in {capital}</h3>
      {weather.map(city =>
      <div key={city.location.name}>
        <p>temperature: {city.current.temperature} Celcius</p>
        <img src={city.current.weather_icons} alt="weather icon"></img>
        <p>wind:{city.current.wind_speed} km/h direction {city.current.wind_dir} </p>
      </div>
      )} 
    </div>
  )
}
 
const App = () => {

  const [ countries, setCountries ] = useState([])

  const api_key = process.env.REACT_APP_API_KEY
  const [capital, setCapital] = useState(null)
  const [weather, setWeather] = useState(null)

  const CountriesHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    
  }

  const weatherHook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather([response.data])
      })
  }

  const capitalHook = () => {
    if(countriesToShow.length === 1 )
    setCapital(countriesToShow[0].capital)
  }

  useEffect(CountriesHook, [])
  useEffect(weatherHook, [capital])
  useEffect(capitalHook)
  
  const [ newSearch, setNewSearch ] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const matchingCountries = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
  const countriesToShow = matchingCountries.length > 10 ? [] : matchingCountries
  const message = matchingCountries.length > 10 ? "Too many matches, specify another filter" : ''

 
  return (
    <div>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <Countries countriesToShow={countriesToShow} message={message} setNewSearch={setNewSearch} setCapital={setCapital}/>
      <CountryInfo countriesToShow={countriesToShow}/>
      <Weather weather={weather} capital={capital} countriesToShow={countriesToShow}/>
  </div>
  );
}

export default App;
