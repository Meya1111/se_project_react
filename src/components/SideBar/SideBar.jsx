import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({ username, avatar: userAvatar }) {
  return (
    <div className="sidebar">  
        <div className="sidebar__avatar-container">
          {
    <img 
      src={userAvatar}
      />   
      }
          <p className="sidebar__username">{username}</p>
        </div>
    </div>
  );
}

export default SideBar;
