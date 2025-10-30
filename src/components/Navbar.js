
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>🏆Premier League</h1>
      <ul>
        <li><Link to="/">Teams</Link></li>
        <li><Link to="/fixtures">Fixtures</Link></li>
        <li><Link to="/table">Table</Link></li>
        <li><Link to="/top-players">Top Players</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
