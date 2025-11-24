import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "";
  const avatarUrl = currentUser?.avatar || "";

  return (
    <div className="profile__header">
      <div className="profile__user">
        <img className="profile__avatar" src={avatarUrl} alt="user avatar" />
        <h2 className="profile__name">{username}</h2>
      </div>

      <button
        type="button"
        className="profile__edit-btn"
        onClick={onEditProfile}
      >
        Change profile data
      </button>

      <button
        className="profile__logout"
        type="button"
        onClick={onSignOut}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;