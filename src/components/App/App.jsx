import { useEffect, useState } from "react";

import "./App.css";
import { coordinates,apikey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/constants.js";
import Footer from "../footer/Footer.jsx";
import "../footer/Footer.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnit.jsx";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({
   type: "",
   temp: { F: 999 },
   city:"",
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
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" type="radio" name="weather" value="hot" className="modal__radio-input" /> Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" name="weather" value="warm" className="modal__radio-input" /> Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" value="cold" type="radio" name="weather" className="modal__radio-input" /> cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
       activeModal={activeModal} 
       item={selectedCard} 
       onClose={closeActiveModal}
       />
    <Footer />
    </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
