import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams";
import TeamDetail from "./components/TeamDetail";
import Fixtures from "./components/Fixtures";
import Table from "./components/Table";
import TopPlayers from "./components/TopPlayers";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/table" element={<Table />} />
          <Route path="/top-players" element={<TopPlayers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
