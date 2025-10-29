import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/teams/${id}`)
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Error fetching team:", err));
  }, [id]);

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading team details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Back Button */}
      <div className="w-full max-w-3xl mb-6">
        <Link
          to="/teams"
          className="inline-block bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
        >
          ← Back to Teams
        </Link>
      </div>

      {/* Team Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl text-center">
        <div className="flex flex-col items-center">
          <img
            src={team.logo}
            alt={team.name}
            className="w-32 h-32 object-contain mb-4"
          />
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">
            {team.name}
          </h2>
          <p className="text-gray-600 italic mb-4">{team.stadium}</p>

          {/* Team Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">
                <strong className="text-indigo-800">Founded:</strong>{" "}
                {team.founded}
              </p>
              <p className="text-gray-800 mt-2">
                <strong className="text-indigo-800">Stadium:</strong>{" "}
                {team.stadium}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">
                <strong className="text-indigo-800">Points:</strong>{" "}
                {team.points ?? "N/A"}
              </p>
              <p className="text-gray-800 mt-2">
                <strong className="text-indigo-800">Matches Played:</strong>{" "}
                {team.played ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Trophies & Legends */}
          <div className="mt-8 text-left w-full">
            <h3 className="text-xl font-semibold text-indigo-900 mb-3">
              🏆 Trophies
            </h3>
            <ul className="list-disc list-inside text-gray-700 bg-gray-50 rounded-lg p-4">
              {team.trophies && team.trophies.length > 0 ? (
                team.trophies.map((trophy, index) => (
                  <li key={index}>{trophy}</li>
                ))
              ) : (
                <p>No trophies listed.</p>
              )}
            </ul>

            <h3 className="text-xl font-semibold text-indigo-900 mt-8 mb-3">
              ⭐ Club Legends
            </h3>
            <ul className="list-disc list-inside text-gray-700 bg-gray-50 rounded-lg p-4">
              {team.legends && team.legends.length > 0 ? (
                team.legends.map((legend, index) => <li key={index}>{legend}</li>)
              ) : (
                <p>No legends listed.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
