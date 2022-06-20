import { ArrowDown, ArrowUp, Cloud, CloudLightning, CloudRain, CloudSnow, Sun, Wind, X } from "phosphor-react";
import { useState } from "react";

let orange = "#FF9E0A";

// Put the loading and error components in here!
function WeatherPanel(props: any){
  let [isVisible, setIsVisible] = useState<boolean>(true);

  // let weatherOptions = [
  //   {
  //     value: "Clear",
  //     component: <Sun size={32} />
  //   },
  //   {
  //     value: "Rain",
  //     component: <CloudRain size={32} />
  //   },
  //   {
  //     value: "Clouds",
  //     component: <Cloud size={32} />
  //   },
  //   {
  //     value: "Snow",
  //     component: <CloudSnow size={32} />
  //   },
  //   {
  //     value: "Extreme",
  //     component: <CloudLightning size={32} />
  //   },
  // ];

  // let isWeather = () => {    
  //   weatherOptions.filter((weatherOption:any) => {
  //     if(weatherOption.value === props.weather){
  //       return (
  //         <CloudSnow size={32} />
  //         )
  //     }
  //   })
  // }
  
  // console.log(isWeather);

  let weatherIcon;

  if(props.weather === "Rain"){
    weatherIcon = <CloudRain size={32} />;
  }

  if(props.weather === "Clouds"){
    weatherIcon = <Cloud size={32} />;
  }

  if(props.weather === "Snow"){
    weatherIcon = <CloudSnow size={32} />;
  }

  if(props.weather === "Extreme"){
    weatherIcon = <CloudLightning size={32} />;
  }

  if(props.weather === "Clear"){
    weatherIcon = <Sun size={32} />;
  }

  return (
    <div className={isVisible ? "bg-white relative py-4 px-5 my-10" : "hidden"}>
      <header className="text-3xl">{props.city} ({props.country})</header>

      <button type="button" className="absolute right-4 top-4" onClick={() => setIsVisible(!isVisible)}>
        <X size={25} />
      </button>

      <p className="text-2xl my-4 flex">{props.temperature}&#8451;, {props.weather} <span className="mx-2">{weatherIcon}</span></p>

      <div className="flex flex-wrap">
        <div className="flex items-center mr-5">
          <ArrowUp size={32} weight='bold' />
          {props.minTemperature}&#8451;
        </div>

        <div className="flex items-center">
          <ArrowDown size={32} weight='bold' />
          {props.maxTemperature}&#8451;
        </div>

        <p className="w-full mt-5 flex"><Wind size={32} />Wind: {/*{props.wind.speed}*/}</p>
      </div>
    </div>
  )
}

export default WeatherPanel;