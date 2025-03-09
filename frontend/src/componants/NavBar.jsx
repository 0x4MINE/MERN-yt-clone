import {
  CloudUpload,
  HardDriveUpload,
  Moon,
  Search,
  Sun,
  Upload,
  UploadCloud,
} from "lucide-react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
import Dropdown from "./Dropdown";
import Logo from "../assets/logo.png";

const NavBar = ({ uploadOnClick }) => {
  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-bar">
      <div
        className="logo"
        onClick={() => {
          Navigate("/");
        }}
      >
        <img src={Logo} alt="MT" />
        MYTUBE
      </div>
      <SearchBar />

      {!currentUser ? (
        <Link to={"/signin"} className="auth-corner">
          <button>Sign In</button>
        </Link>
      ) : (
        <div className="user-corner">
          <HardDriveUpload onClick={uploadOnClick} />
          <img
            onClick={() => setOpen(!open)}
            src={"https://corsproxy.io/?" + currentUser.profilePic}
            alt=""
            className="userImg"
            style={{
              width: "50px",

              height: "50px",
              borderRadius: "50%",
              display: "block",
            }}
          />

          {open && <Dropdown />}
        </div>
      )}
    </div>
  );
};

export default NavBar;
