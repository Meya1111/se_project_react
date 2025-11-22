import { useCallback, useEffect, useState } from "react";

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
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { signup, signin, checkToken } from "../../utils/auth.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { updateUser } from "../../utils/api.js";

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
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const openRegister = () => setActiveModal("register");
  
  const closeAllModals = () => {
    setActiveModal("");
    setSelectedCard({});
    setIsEditProfileOpen(false);
  };

  const handleRegister = (formValues) => {
    return signup(formValues)
      .then(() => handleLogin(formValues))
      .catch(console.error);
  };
  const handleLogin = useCallback((formValues) => {
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
  },[]);

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
    setSelectedCard({});
    setIsEditProfileOpen(false);
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  function handleEditProfileModal() {
    setIsEditProfileOpen(true);
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateUser = ({ name, avatar }) => {
    updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setIsLoggedInLoading(false);
      return;
    }

    setIsLoggedInLoading(true);

    checkToken(token)
      .then((user) => {
        console.log(user)
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsLoggedInLoading(false);
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
              username="Terrence Teggene"
              avatar={avatar}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              onSignOut={handleSignOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
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
                      <Profile
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        username="Terrence Tegegne"
                        avatar={avatar}
                        clothingItems={clothingItems}
                        onAddClick={handleAddClick}
                        onSignOut={handleSignOut}
                        onEditProfile={handleEditProfileModal}
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

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={closeActiveModal}
          onSubmit={handleUpdateUser}
        />

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={handleRegister}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={handleLogin}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
