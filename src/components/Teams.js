import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("https://epl-backend.vercel.app/teams")
      .then(res => res.json())
      .then(data => setTeams(data));
  }, []);

  return (
    <div className="teams-container">
      <h2>Premier League Teams</h2>
      <div className="team-list">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <img src={team.logo} alt={team.name} width="100" />
            <h3>{team.name}</h3>
            <p>{team.stadium}</p>
            <Link to={`/teams/${team.id}`}><button>View Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
