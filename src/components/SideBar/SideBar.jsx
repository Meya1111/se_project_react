import "./SideBar.css";

function SideBar({ username, avatar, onEditProfile, onSignOut }) {
  return (
     <div className="profile__header">
      <img className="profile__avatar" src={avatar} alt="user avatar" />
      <h2 className="profile__name">{username}</h2>

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