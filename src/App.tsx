import { useState } from 'react';
import axios from 'axios';

import Title from './components/title';
import InputField from './components/inputField';
import WeatherPanel from './components/weatherPanel';
import Loading from './components/loading';
import Error from './components/error';

import './App.css';

let API_key = "9badc7c6ad1223425a6fc2945eac9297";

const App = () => {
  // Weather parameters
  let [temperature, setTemperature] = useState<number | null>(0);
  let [minTemperature, setMinTemperature] = useState<number | null>(0);
  let [maxTemperature, setMaxTemperature] = useState<number | null>(0);
  let [country, setCountry] = useState<string>('');
  let [city, setCity] = useState<string>('');
  let [weather, setWeather] = useState<string>('');

  // General settings
  let [isError, setIsError] = useState<boolean>(false);
  let [isLoading, setIsLoading] = useState<boolean>(false);

  let convertKelvinToCelsius = (value:number) => {
    return Math.floor(value - 273.15);
  }

  let getLocation = async (param:any) => {
    let value = param;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=" + API_key;

    setIsLoading(true);

    try {
      let response = await axios.get(url);

      setCity(response.data.name);
      setCountry(response.data.sys.country);
      setTemperature(convertKelvinToCelsius(response.data.main.temp));
      setMinTemperature(convertKelvinToCelsius(response.data.main.temp_min));
      setMaxTemperature(convertKelvinToCelsius(response.data.main.temp_max));
      setWeather(response.data.weather[0].main);

      setIsError(false);
      setIsLoading(false);
    }
    
    catch (error) {
      // resets values, if an error is returned. So that the weather panel won't be shown with wrong or empty values.
      setCity('');
      setCountry('');
      setTemperature(convertKelvinToCelsius(0));
      setMinTemperature(convertKelvinToCelsius(0));
      setMaxTemperature(convertKelvinToCelsius(0));
      setWeather('');

      setIsError(true);
      // setIsLoading(false);
      console.log(isError);
    }
  }

  let typingHandler = (el:any) => {
    let inputValue = el.target.value;
    let timer;

    // When the user types, the timer starts to run. If it reaches a certain value, run the function.
    if(inputValue.length){
      clearTimeout(timer);
      console.log('timeout cleared');

      getLocation(inputValue);

      // timer = setTimeout(() => {
      // }, 2000);
    }
  }

  return (
    <main className="App mt-28 scrollbar">
      <Title className="text-white text-4xl font-semibold text-center mb-8" text="Weather Forecast" />

      <form className="max-w-3xl mr-auto ml-auto" onSubmit={arg => arg.preventDefault()}>
        <InputField
          placeholder="Insert the desired location"
          onKeyUp={(el:any) => typingHandler(el)}
        />

        <div className='max-w-md mx-auto relative'>
          {isLoading && <Loading className={isError ? ' hidden' : ''} />}
          {city && <WeatherPanel city={city} country={country} weather={weather} temperature={temperature} minTemperature={minTemperature} maxTemperature={maxTemperature} />}
          {isError && <Error />}

          {/* {city &&
            <WeatherPanel
              city={city}
              country={country}
              weather={weather}
              temperature={temperature}
              minTemperature={minTemperature}
              maxTemperature={maxTemperature}
              error={isError}
              loading={isLoading} />
            } */}
        </div>
      </form>
    </main>
  )
}

export default App;
