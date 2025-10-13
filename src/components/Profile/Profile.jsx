import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnit";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";

function Profile({
  username,
  avatar,
  clothingItems,
  onCardClick,
  onAddClick,
  weatherData,
}) {
  const currentTemperatureUnit = useContext(currentTemperatureUnitContext);
  const displayTemp =
    currentTemperatureUnit === "F"
      ? Math.round(weatherData?.temp?.f ?? 0)
      : Math.round(weatherData?.temp?.c ?? 0);
  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="profile">
        <div className="profile__header">
          <img className="profile__avatar" src={avatar} alt="User avatar" />
          <h1 className="profile__name">{username}</h1>
        </div>
      </section>

      <section className="cards">
        <div className="cards__text">
          <p>
            Today is{" "}
            {typeof displayTemp === "number"
              ? displayTemp
              : Math.round(weatherData?.temp?.f ?? 0)}
            °<span> • Your wardrobe</span>
          </p>
          <button
            className="cards__add-button"
            type="button"
            onClick={onAddClick}
          >
            + Add clothes
          </button>
        </div>
        <ul className="card__list">
          {clothingItems
            ?.filter((item) => {
              if (!weatherData?.type) return true;
              return item.weather === weatherData.type;
            })
            .map((item, index) => (
              <ItemCard
                key={item._id || item.id || `${item.name}-${index}`}
                item={item}
                onCardClick={onCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Profile;
