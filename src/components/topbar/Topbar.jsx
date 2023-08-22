import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {

  function handleClick() {

    const confirmed = window.confirm(
      `Are you sure you want to sign out. Please make sure you have your credentials at hand in case you want to sign in again!`
    );
    if (confirmed) {
      localStorage.removeItem("user");
      localStorage.removeItem("gwocu-setting");
      history.go(0);
      }
  }

  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <img src= 'https://chatbotadmin.gwocu.com/assets/gwocu.png' className="logo">
      </img>
        <Link to="/" style={{ textDecoration: "none" }}>
         <span className="logotext">AI Podium</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for chatbot"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <span className="topbarLink" onClick={handleClick}>
        Sign Out of the Podium
        </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/updateuser/`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
