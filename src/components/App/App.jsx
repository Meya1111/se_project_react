import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../footer/Footer.jsx";
import "../footer/Footer.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import SideBar from "../SideBar/SideBar.jsx";
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { signup, signin, checkToken } from "../../utils/auth.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx"

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const openRegister = () => setActiveModal("register");
  const openLogin = () => setActiveModal("login");

  const handleRegister = (formValues) => {
    return signup(formValues)
      .then(() => {
        setActiveModal("");

        setActiveModal("login");
      })
      .catch(console.error);
  };

  const handleLogin = (formValues) => {
    return signin(formValues)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
        }
        setActiveModal("");
      })
      .catch(console.error)
      .finally(() => {
        setIsLoggedInLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      _id: Date.now(),
      name: inputValues.name,
      imageUrl: inputValues.link,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
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
                  <ProtectedRoute
                    loggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
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
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          ></AddItemModal>
        </CurrentTemperatureUnitContext.Provider>
        <ItemModal
          isOpen={activeModal === "preview"}
          onClose={closeActiveModal}
          item={selectedCard}
          onDelete={handleDeleteItem}
        ></ItemModal>
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={() => setActiveModal("")}
          onRegister={handleRegister}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={() => setActiveModal("")}
          onLogin={handleLogin}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
