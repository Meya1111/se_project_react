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
  const name = currentUser?.name || "";
  const avatarUrl =
    currentUser?.avatar && currentUser.avatar.length ? currentUser.avatar : "";
  const userInitial = (name.trim()[0] || "").toUpperCase();

  return (
    <header className="header">
      <div className="header__logo-container" >
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
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
              <li>
                <button
                  onClick={handleAddClick}
                  type="button"
                  className="header__add-clothes-btn"
                >
                  + Add clothes
                </button>
              </li>

              <li>
                <Link to="/profile" className="header__link">
                  <div className="header__profile">
                    <div className="header__username">{currentUser.name}</div>

                    {currentUser.avatar ? (
                      <img
                        className="header__avatar"
                        src={currentUser.avatar}
                        alt="user avatar"
                      />
                    ) : (
                      <span className="header__avatar header__avatar_none">
                        {(currentUser.name?.trim()?.[0] || "").toUpperCase()}
                      </span>
                    )}
                  </div>
                </Link>
              </li>

              <li>
                <button
                  className="header__logout"
                  type="button"
                  onClick={onSignOut}
                >
                  Sign out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
