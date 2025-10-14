import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({ username, avatar: userAvatar }) {
  return (
    <div className="sidebar">  
        <div className="sidebar__avatar-container">
          {
    <img 
      src={userAvatar}
      alt="User avatar"
      className="profile__avatar"
      />   
      }
          <p className="sidebar__username">{username}</p>
        </div>
    </div>
  );
}

export default SideBar;
