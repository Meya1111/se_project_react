import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "";
  const avatarUrl = currentUser?.avatar || "";

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatarUrl} alt="user avatar" />
        <h2 className="sidebar__name">{username}</h2>
      </div>

      <button className="sidebar__btn" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__btn" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;