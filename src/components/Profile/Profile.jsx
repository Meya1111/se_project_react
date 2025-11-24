import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";

function Profile({
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
      <SideBar
        onEditProfile={onEditProfile}
        onSignOut={onSignOut}
      />
      <section className="profile-clothes">
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