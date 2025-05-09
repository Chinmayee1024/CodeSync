import React, { useContext, useState } from "react";
import headerImg from "../assets/mainLogo.png";
import { NavLink } from "react-router-dom";
import { UsedContext } from "./App";
import profileIcon from "../assets/profileIcon.png"; // Add your profile icon image here

function Header() {
  const { state } = useContext(UsedContext);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to toggle dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          {/* Profile Icon with Dropdown */}
          <div className="profile-container">
            <img
              src={profileIcon} // Use the path to your profile icon image
              alt="Profile"
              className="profile-icon"
              onClick={toggleDropdown}
            />
            {isDropdownVisible && (
              <div className="profile-dropdown">
                <NavLink to="/settings" className="dropdown-option">
                  Settings
                </NavLink>
                <NavLink to="/logout" className="dropdown-option">
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/login">
            <button className="Headerbtn Headerbtn1 btn">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className="Headerbtn Headerbtn2 btn">Register</button>
          </NavLink>
        </>
      );
    }
  };

  return (
    <div className="headerContainer">
      <div className="headerImage">
        <img className="headerlogo" src={headerImg} alt="MainLogo" />
        <NavLink className="headerp" to="/">
          CodeSync
        </NavLink>
      </div>
      <div className="Headerbtngroup">
        <RenderMenu />
      </div>
    </div>
  );
}

export default Header;
