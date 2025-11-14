import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams";
import TeamDetail from "./components/TeamDetail";
import Fixtures from "./components/Fixtures";
import Table from "./components/Table";
import TopPlayers from "./components/TopPlayers";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main style={{ paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/table" element={<Table />} />
            <Route path="/top-players" element={<TopPlayers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
