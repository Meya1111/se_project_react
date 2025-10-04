import { useEffect, useState } from "react";

import "./App.css";
import { coordinates,apikey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/constants.js";
import Footer from "../footer/Footer.jsx";
import "../footer/Footer.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnit.jsx";
import { Routes, Route  } from "react-router-dom";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({
   type: "",
   temp: { F: 999, C: 999 },
   condition:"",
   city:"",
   isDay: false,
    });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = ()=> {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F"? "C":"F");
  }

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
    setClothingItems([...clothingItems, newCardData]); 
    closeActiveModal();
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

 useEffect(() => {
  getWeather(coordinates, apikey)
   .then((data) => {
   const filteredData = filterWeatherData(data);
   setWeatherData(filteredData);
  })
  .catch(console.error);
 }, []);
 
 <Routes>
  <Route
  path="/"
  element={
    <Main weatherData={weatherData}
     onCardClick={handleCardClick} 
     />
    }
  />
  <Route path="/profile" 
   element={<Profile onCardClick={handleCardClick} />} 
  />
 </Routes>

  return (
    <currentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main 
        weatherData={weatherData}
        clothingItems={clothingItems} 
         handleCardClick={handleCardClick} 
        />
      </div>
      <AddItemModal   
       isOpen={activeModal === "add-garment"}
       onClose={closeActiveModal}
       onAddItem={onAddItem}
       ></AddItemModal>
    <Footer />
    </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
