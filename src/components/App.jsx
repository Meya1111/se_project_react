import { useState } from "react";

import "./App.css";
import Header from "./Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import ModalWithForm from "./ModalWithForm/ModalWithForm.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
  <div className= "page">
  <div className= "page__content">
    <Header />
    <Main weatherData={weatherData} />
    </div>
    <ModalWithForm title="New garment" buttonText="Add garment" >
    <label htmlFor="name" className="modal__label">
        Name {" "}
        <input 
        type="text" 
        className="modal__input"
        id="name"
        placeholder="Name"
        />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
        Image {" "}
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
        <input 
        id="cold"
        type="radio"
        className="modal__radio-input"/> Hot 
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio"
        >
        <input 
        id="cold"
        type="radio"
        className="modal__radio-input"/> Warm
        </label>
        <label
        htmlFor="cold"
        className="modal__label modal__label_type_radio"
        >
        <input id="cold"
        type="radio"
        className="modal__radio-input" /> cold    
        </label>
      </fieldset>
    </ModalWithForm>
  </div>
  );
  }

export default App;
