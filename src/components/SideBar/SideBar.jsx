import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({ username,avatar: userAvatar }) {
  return (
  <div className="profile">
   <section className="profile__sidebar">
    <div className="profile__avatar-container">
      <img 
      src={userAvatar}
      alt="User avatar"
      className="profile__avatar"
      />  
      <p className="profile__username">{username}</p>
    </div>
    </section> 
  </div>  
  );   
}

export default SideBar;