import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useTheme } from "../store/useTheme";
import { Moon, Sun } from "lucide-react";

const Dropdown = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="user-dropdown">
      <div className="user">
        <img
          src={"https://corsproxy.io/?" + currentUser.profilePic}
          alt=""
          className="userImg"
        />
        <div className="user-info">
          <h3>{currentUser.name}</h3>
          <p>{currentUser.subscribers.length} subscribers</p>
        </div>
      </div>

      <Link className="dropbtn" to="/profile">
        Profile
      </Link>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <Moon /> : <Sun />}
      </button>
      <Link className="dropbtn" to="/settings">
        Settings
      </Link>
      <div onClick={logout} className="dropbtn" to="/settings">
        Logout
      </div>
    </div>
  );
};

export default Dropdown;
