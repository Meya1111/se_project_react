import "./SideBar.css";

function SideBar({ username, avatar: userAvatar }) {
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        {userAvatar && (
          <img
            src={userAvatar}
            alt={`${username}'s avatar`}
            className="sidebar__avatar"
          />
        )}
        <p className="sidebar__username">{username}</p>
      </div>
    </div>
  );
}

export default SideBar;
