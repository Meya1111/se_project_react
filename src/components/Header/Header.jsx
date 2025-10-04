import "./Header.css"
import logo from "../../assets/logo2.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, username, avatar }) {
  const currentDate = new Date().toLocaleString('default', { 
    month: 'long',
     day: 'numeric' 
    });
    return (
 <header className="header">
  <Link to="">
  <img className="header__logo" src={logo} alt="WTWR logo" />
  </Link>
  <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
  <ToggleSwitch />
  <button
   onClick={handleAddClick}
   type="button" 
   className="header__add-clothes-btn"
   >
    + Add clothes
    </button>
    <Link to="/profile" className="header__link">
    <div className="header__profile">
      <div className="header__user-name">{username}</div>
      {avatar ? (
        <img
        className="header__avatar"
        src={avatar || avatarDefault}
        alt="user avatar"
        />
      ) : (
        <span className="header__avatar header__avatar_none">
          {username?.toUpperCase().charAt(0) || ""}
        </span>
      )}
    </div>
    </Link>
  <div className="header__user-container">
    <p className="header__username">Terrence Tegegne</p>
    <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
  </div>
</header>
    );
  }
  
  export default Header;