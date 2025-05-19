import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import headerImg from "../assets/mainLogo.png";
import profileIcon from "../assets/profileIcon.png";
import { UsedContext } from "./App";

function Header() {
  const { state } = useContext(UsedContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const location = useLocation();
  const isEditorPage = location.pathname.startsWith("/editor");
  const isLoginPage = location.pathname.startsWith("/login");
  const isRegisterPage = location.pathname.startsWith("/register");

  const RenderMenu = () => {
    if (state) {
      return (
        <div className="profile-container">
          <img
            src={profileIcon}
            alt="Profile"
            className="profile-icon"
            onClick={toggleDropdown}
          />
          {isDropdownVisible && (
            <div className="profile-dropdown">
              <NavLink to="/profile" className="dropdown-option">
                Profile
              </NavLink>
              <NavLink to="/logout" className="dropdown-option">
                Logout
              </NavLink>
            </div>
          )}
        </div>
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

      {/* Only show nav links & hamburger if NOT on editor/login/register */}
      {!(isEditorPage || isLoginPage || isRegisterPage) && (
        <>
          {/* Hamburger icon */}
          <div className="hamburger" onClick={toggleMobileMenu}>
            ☰
          </div>

          {/* Desktop Navigation */}
          <div className="languageLinks">
            <a href="#python">Python</a>
            <a href="#javascript">JavaScript</a>
            <a href="#java">Java</a>
            <a href="#c">C</a>
            <a href="#dart">Dart</a>
            <a href="#image2text">Image2Text</a>
            <a href="#voice2text">Voice2Text</a>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="mobileMenu">
              <a href="#python" onClick={toggleMobileMenu}>Python</a>
              <a href="#javascript" onClick={toggleMobileMenu}>JavaScript</a>
              <a href="#java" onClick={toggleMobileMenu}>Java</a>
              <a href="#c" onClick={toggleMobileMenu}>C</a>
              <a href="#dart" onClick={toggleMobileMenu}>Dart</a>
              <a href="#image2text" onClick={toggleMobileMenu}>Image2Text</a>
              <a href="#voice2text" onClick={toggleMobileMenu}>Voice2Text</a>
            </div>
          )}
        </>
      )}

      <div className="Headerbtngroup">
        <RenderMenu />
      </div>
    </div>
  );
}

export default Header;
