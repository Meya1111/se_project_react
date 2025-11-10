import "./Header.css";
import logo from "../../assets/logo2.svg";
import defaultAvatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData }) {
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
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <nav className="navigation">
        <ul className="navgiation__container">
          <ToggleSwitch />
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
                <div className="header__username">{name}</div>
                {avatarUrl ? (
                  <img
                    className="header__avatar"
                    src={avatarUrl}
                    alt="user avatar"
                  />
                ) : (
                  <span className="header__avatar header__avatar_none">
                    {userInitial}
                  </span>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
