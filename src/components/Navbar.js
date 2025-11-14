import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({ isDark, toggleTheme }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.875rem' }}>🏆</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', margin: 0 }}>
            PREMIER LEAGUE
          </h1>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
              >
                Teams
              </Link>
            </li>
            <li>
              <Link 
                to="/fixtures" 
                className={isActive('/fixtures') ? 'active' : ''}
              >
                Fixtures
              </Link>
            </li>
            <li>
              <Link 
                to="/table" 
                className={isActive('/table') ? 'active' : ''}
              >
                Table
              </Link>
            </li>
            <li>
              <Link 
                to="/top-players" 
                className={isActive('/top-players') ? 'active' : ''}
              >
                Top Players
              </Link>
            </li>
          </ul>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
