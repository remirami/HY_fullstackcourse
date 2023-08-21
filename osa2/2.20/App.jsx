import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountriesList = ({ countries, setSelectedCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.alpha3Code}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>Show</button></div>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.keys(country.languages).map(isoCode => (
            <li key={isoCode}>{country.languages[isoCode]}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      </div>
    );
  }
  return null;
};

  const CountryDetail = ({country}) => {
    const [weather, setWeather] = useState(null);

  useEffect(() => {
  const apiKey = import.meta.env.VITE_SOME_KEY;
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)    .then(response => {
      console.log("Weather data:", response.data);  
      setWeather(response.data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
    });
}, [country]);
    return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
      {Object.keys(country.languages).map(isoCode => (
        <li key={isoCode}>{country.languages[isoCode]}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
    {weather && (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p><strong>temperature:</strong> {weather.main.temp}°C</p>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
        <p><strong>wind:</strong> {weather.wind.speed} m/s</p>
      </div>
    )}
    </div>
    )
  }
  const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      axios
        .get(`https://restcountries.com/v3.1/name/${event.target.value}`)
        .then(response => {
          setCountries(response.data);
          if (response.data.length === 1) {
            setSelectedCountry(response.data[0])
          }
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    } else {
      setCountries([]);
    }
};  
return (
    <div>
    find countries <input value={searchTerm} onChange={handleSearchChange} />
    {selectedCountry ? (
      <CountryDetail country={selectedCountry} />
    ) : (
      <CountriesList countries={countries} setSelectedCountry={setSelectedCountry} />
    )}
    </div>
  );
};


export default App;