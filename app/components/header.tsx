import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header_wrapper">
        <nav className="header-nav">
          <li className="header-nav_link">
            <NavLink
              data-testid="toMain"
              className={({ isActive }) =>
                isActive ? "navactive" : "navnotactive"
              }
              to="/"
            >
              Welcome
            </NavLink>
          </li>
          <li className="header-nav_link">
            <NavLink
              data-testid="toAbout"
              to="/form"
              className={({ isActive }) =>
                isActive ? "navactive" : "navnotactive"
              }
            >
              Form
            </NavLink>
          </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;
