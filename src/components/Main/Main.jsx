import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnit";

function Main({ weatherData, clothingItems, handleCardClick }) {
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
        .map((item) => {
          return (
        <ItemCard
         key={item._id || item.id}
          item={item} 
          onCardClick={handleCardClick}
         />
          );
        })}
        </ul>
        </section>   
     </main>
    );
}

export default Main;