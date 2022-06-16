import { useState } from 'react';
import axios from 'axios';

import Title from './components/title';
import Table from './components/table';
import InputField from './components/inputField';
import Error from './components/error';
import Loading from './components/loading';
import WeatherPanel from './components/weatherPanel';

import './App.css';

let API_key = "9badc7c6ad1223425a6fc2945eac9297";

function App() {
  // Weather parameters
  let [temperature, setTemperature] = useState<number | null>(0);
  let [minTemperature, setMinTemperature] = useState<number | null>(0);
  let [maxTemperature, setMaxTemperature] = useState<number | null>(0);
  let [country, setCountry] = useState<string>('');
  let [city, setCity] = useState<string>('');
  let [weather, setWeather] = useState<string>('');

  // General settings
  let [error, setError] = useState<boolean>(false);
  let [isLoading, setIsLoading] = useState<boolean>(false);

  const convertKelvinToCelsius = (value:number) => {
    return Math.floor(value - 273.15);
  }

  const getLocation = async (param:any) => {
    let value = param;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=" + API_key;

    setIsLoading(true);

    try {
      const response = await axios.get(url);
      setCity(response.data.name);
      setCountry(response.data.sys.country);
      setTemperature(convertKelvinToCelsius(response.data.main.temp));
      setMinTemperature(convertKelvinToCelsius(response.data.main.temp_min));
      setMaxTemperature(convertKelvinToCelsius(response.data.main.temp_max));
      setWeather(response.data.weather[0].main);

      setError(false);
      setIsLoading(false);
    }
    
    catch (error) {
      // resets values, if an error is returned. So that the weather panel won't be shown with wrong values.
      setCity('');
      setCountry('');
      setTemperature(convertKelvinToCelsius(0));
      setMinTemperature(convertKelvinToCelsius(0));
      setMaxTemperature(convertKelvinToCelsius(0));
      setWeather('');

      setError(true);
    }
  }

  const typingHandler = (el:any) => {
    let inputValue = el.target.value;
    let timer;

    // When the user types, the timer starts to run. If it reaches a certain value, run the function.
    if(inputValue.length){
      clearTimeout(timer);
      console.log('timeout cleared');
  
      timer = setTimeout(() => {
        getLocation(inputValue);
      }, 1250);
    }
  }

  return (
    <main className="App mt-16 scrollbar">
      <Title className="text-white text-4xl font-semibold text-center mb-8" text="Previsão do Tempo" />

      <form className="max-w-3xl mr-auto ml-auto" onSubmit={arg => arg.preventDefault()}>
        <InputField
          placeholder="Insira o nome da localidade (país, cidade) desejada"
          // onChange={(e:string) => getLocation(e)}
          onKeyUp={(el:any) => typingHandler(el)}
        />

        <div className='max-w-md mx-auto relative'>
          {isLoading && <Loading className={error ? ' hidden' : ''} />}
          {city ? <WeatherPanel city={city} country={country} weather={weather} temperature={temperature} minTemperature={minTemperature} maxTemperature={maxTemperature} /> : '' }
          {error ? <Error /> : ''}
        </div>

        <hr className="w-full relative mb-10 mt-10" />

        <Title className="text-white text-3xl font-semibold text-center mb-8" text="Capitais" />

        <Table />
      </form>
    </main>
  )
}

export default App;
