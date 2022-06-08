import { useState } from 'react';
import axios from 'axios';

import Title from './components/title';
import Table from './components/table';
import InputField from './components/inputField';
import Error from './components/error';

import WeatherPanel from './components/weatherPanel';

import './App.css';

let API_key = "9badc7c6ad1223425a6fc2945eac9297";

function App() {
  let [temperature, setTemperature] = useState<number>(0);
  let [minTemperature, setMinTemperature] = useState<number>(0);
  let [maxTemperature, setMaxTemperature] = useState<number>(0);

  let [country, setCountry] = useState<string>('');
  let [city, setCity] = useState<string>('');
  let [weather, setWeather] = useState<string>('');

  let [error, setError] = useState<boolean>(false);

  const convertKelvinToCelsius = (value:number) => {
    return Math.floor(value - 273.15);
  }

  const getLocation = (param:any) => {
    let value = param.target.value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=" + API_key;

    return axios.get(url)
      .then(function(response){
        console.log(response);

        setCity(response.data.name);
        setCountry(response.data.sys.country);

        setTemperature(convertKelvinToCelsius(response.data.main.temp));

        setMinTemperature(convertKelvinToCelsius(response.data.main.temp_min));
        setMaxTemperature(convertKelvinToCelsius(response.data.main.temp_max));
        setWeather(response.data.weather[0].main);

        setError(false);
      })

      .catch(function(error){
        setError(true);
      })

      .then(function(){
        console.log('Request finished');
      });
  }

  return (
    <main className="App mt-16 scrollbar">
      <Title className="text-white text-4xl font-semibold text-center mb-8" text="Previsão do Tempo" />

      <form className="max-w-3xl mr-auto ml-auto" onSubmit={arg => arg.preventDefault()}>
        <InputField
          placeholder="Insira o nome da localidade (país, cidade) desejada"
          onChange={(e:string) => getLocation(e)}
        />

        {city && <WeatherPanel city={city} country={country} weather={weather} temperature={temperature} minTemperature={minTemperature} maxTemperature={maxTemperature} /> }

        {error ? (
          <Error />
        ) : ''}

        <hr className="w-full relative mb-10 mt-10" />

        <Title className="text-white text-3xl font-semibold text-center mb-8" text="Capitais" />

        <h2 className="title mb-10"></h2>

        <Table />
      </form>
    </main>
  )
}

export default App;
