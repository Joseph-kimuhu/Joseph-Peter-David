
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🏆Premier League</h1>
      <ul className="nav-links">
        <li className="nav-item"><Link to="/">Teams</Link></li>
        <li className="nav-item"><Link to="/fixtures">Fixtures</Link></li>
        <li className="nav-item"><Link to="/table">Table</Link></li>
        <li className="nav-item"><Link to="/top-players">Top Players</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
