import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";

function Profile({
  username,
  avatar,
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
  weatherData,
  onEditProfile,
  onSignOut,
}) {
  const currentTemperatureUnit = useContext(currentTemperatureUnitContext);
  const displayTemp =
    currentTemperatureUnit === "F"
      ? Math.round(weatherData?.temp?.f ?? 0)
      : Math.round(weatherData?.temp?.c ?? 0);
  return (
    <div className="profile">
      <SideBar />
      <div className="profile__header">
        <img className="profile__avatar" src={avatar} alt="user avatar" />
        <h2 className="profile__name">{username}</h2>
        <button
          type="button"
          className="profile__edit-btn"
          onClick={onEditProfile}
        >
          Log In
        </button>
        <button className="profile__logout" type="button" onClick={onSignOut}>
          Log out
        </button>
      </div>
      <section className="profile-clothes">
        <div className="profile__clothes-header">
          <h2 className="profile__title">Your items</h2>
          <button
            type="button"
            className="profile__add-btn"
            onClick={onAddClick}
          >
            + Add new
          </button>
        </div>

        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onAddClick={onAddClick}
          weatherData={weatherData}
        />
      </section>
    </div>
  );
}

export default Profile;
