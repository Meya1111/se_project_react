import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnit";

function WeatherCard({ weatherData }) {
const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  function normalizeCondition(condition) {
    if (condition === "clouds") return "cloudy";
    return condition.toLowerCase();
  }
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition.toLowerCase() === normalizeCondition(weatherData.condition)
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{currentTemperatureUnit} 
      </p>
      <img 
      src={weatherOption?.url} 
      alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${weatherOption?.condition} weather`} 
      className="weather-card__image" 
      />
    </section>
  );
}

export default WeatherCard;
