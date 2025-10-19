import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnit.js";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext); 
  const displayTemp = currentTemperatureUnit === "F"                            
    ? `${Math.round(weatherData.temp.F)} °F`
    : `${Math.round(weatherData.temp.C)} °C`;
    return (
     <main>
     <WeatherCard weatherData={weatherData} />
     <section className="cards">
      <p className="cards__text">
      Today is {displayTemp} / You may want to wear:
        </p>  
        <ul className="card__list">
        {clothingItems?.filter((item) => {
          if (!weatherData?.type) return true;
        return item.weather === weatherData.type;
        })
        .map((item, index) => {
          return (
        <ItemCard
         key={item._id || item.id || `${item.name}-${index}`}
          item={item} 
          onCardClick={onCardClick}
         />
          );
        })}
        </ul>
        </section>   
     </main>
    );
}

export default Main;