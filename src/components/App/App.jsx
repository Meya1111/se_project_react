import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/constants.js";
import Footer from "../footer/Footer.jsx";
import "../footer/Footer.css";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnit.jsx";
import { Routes, Route } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import SideBar from "../SideBar/SideBar.jsx";
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import { use } from "react";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    city: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Get the clothing items using the API

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      id: Date.now(),
      name: inputValues.name,
      link: inputValues.link,
      weather: inputValues.weatherType,
    };
    setClothingItems((prev) => [newCardData, ...prev]);
    closeActiveModal();
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((c) => c.id !== id));
        setActiveModal("");
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    
  }, []);

useEffect(()=> {
  getItems()
  .then((data) => {
    setClothingItems(data);
  })
  .catch((err) => {
    console.error(err);
  });
}, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            username="Terrence Tegegne"
            avatar={avatar}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <div className="profile-page">
                  <SideBar username="Terrence Tegegne" avatar={avatar} />
                  <Profile
                    onCardClick={handleCardClick}
                    username="Terrence Tegegne"
                    avatar={avatar}
                    clothingItems={clothingItems}
                    onAddClick={handleAddClick}
                  />
                </div>
              }
            />
          </Routes>
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
        ></AddItemModal>
      </div>
      <ItemModal
        isOpen={activeModal === "preview"}
        onClose={closeActiveModal}
        item={selectedCard}
        onDelete={handleDeleteItem}
      ></ItemModal>
      <Footer />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
