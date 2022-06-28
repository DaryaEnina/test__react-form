import React from "react";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  return (
    <main>
      <div className="main_wrapper">
        <h2>Welcome</h2>
        <h2>to my test task</h2>
        <h3>My contacts:</h3>

        <nav className="welcome-nav">
          <li className="welcome-nav_link">
            <a href="https://github.com/DaryaEnina" target="_blank">
              GitHub
            </a>
          </li>
          <li className="welcome-nav_link">
            <a href="https://www.linkedin.com/in/darya-enina" target="_blank">
              LinkedIn
            </a>
          </li>
          <li className="welcome-nav_link">
            <a
              href="https://drive.google.com/file/d/1N21EpUKivhpok5VB9_iuDps3B-obUMKJ/view?usp=sharing"
              target="_blank"
            >
              CV
            </a>
          </li>
        </nav>
      </div>
    </main>
  );
};

export default Welcome;
