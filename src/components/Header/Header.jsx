import "./Header.css";
import logo from "../../assets/logo2.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  onSignOut,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);

  const username = currentUser?.name || "";
  const avatarUrl = currentUser?.avatar || "";
  const userInitial = username ? username.trim()[0].toUpperCase() : "";

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData?.city}
        </p>
      </div>
      <nav className="navigation">
        <ul className="navgiation__container">
          <ToggleSwitch />

          {!isLoggedIn ? (
            <li className="header__auth">
              <button
                type="button"
                className="header__signup"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__login"
                onClick={onLoginClick}
              >
                Log In
              </button>
            </li>
          ) : (
            <>
             <li className="header__user-container">
  <button
    onClick={handleAddClick}
    type="button"
    className="header__add-clothes-btn"
  >
    + Add Clothes
  </button>

  <Link to="/profile" className="header__link">
    <div className="header__profile">
      <div className="header__username">{username || ""}</div>

      {avatarUrl ? (
        <img className="header__avatar" src={avatarUrl} alt="user avatar" />
      ) : null}
    </div>
  </Link>
</li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
