import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditProfileModal }) {
  const currentUser = useContext(CurrentUserContext);

  const avatar = currentUser.avatar || currentUser.name.charAt(0).toUpperCase();
  const username = currentUser.name;

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">{username}</p>
      <button
        className="sidebar__edit-profile"
        type="button"
        onClick={handleEditProfileModal}
      >
        Change profile data
      </button>
    </div>
  );
}

export default SideBar;
