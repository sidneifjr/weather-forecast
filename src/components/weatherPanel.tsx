import { ArrowDown, ArrowUp, X } from "phosphor-react";
import { useState } from "react";

let orange = "#FF9E0A";

// Put the loading and error components in here!
function WeatherPanel(props: any){
  let [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <div className={isVisible ? "bg-white relative py-4 px-5 my-10" : "hidden"}>
      <header className="text-3xl">{props.city} ({props.country})</header>

      <button type="button" className="absolute right-4 top-4" onClick={() => setIsVisible(!isVisible)}>
        <X size={25} />
      </button>

      <p className="text-2xl my-4">{props.temperature}&#8451;, {props.weather}</p>

      <div className="flex flex-wrap">
        <div className="flex items-center mr-5">
          <ArrowUp size={32} color={orange} weight='bold' />
          {props.minTemperature}&#8451;
        </div>

        <div className="flex items-center">
          <ArrowDown size={32} color={orange} weight='bold' />
          {props.maxTemperature}&#8451;
        </div>

        <p className="w-full block">Sensation</p>
        <p className="w-full block">Wind</p>
      </div>
    </div>
  )
}

export default WeatherPanel;