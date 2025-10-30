
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("https://epl-backend.vercel.app/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
        Premier League Teams
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-2xl shadow-lg p-6 w-64 flex flex-col items-center hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-28 h-28 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
            <p className="text-gray-500">{team.stadium}</p>
            <Link to={`/teams/${team.id}`} className="mt-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
