import React, { useEffect, useState } from "react";

function Table() {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    played: "",
    goalsScored: "",
    goalsConceded: "",
    points: "",
  });
  const [newTeam, setNewTeam] = useState({
    name: "",
    played: "",
    goalsScored: "",
    goalsConceded: "",
    points: "",
  });

  useEffect(() => {
    fetch("https://epl-backend.vercel.app/teams")
      .then((res) => res.json())
      .then(setTeams)
      .catch((err) => console.error("Error fetching teams:", err));
  }, []);

  const handleEdit = (team) => {
    setEditingTeam(team.id);
    setUpdatedData({
      played: team.played,
      goalsScored: team.goalsScored,
      goalsConceded: team.goalsConceded,
      points: team.points,
    });
  };

  const handleSave = (id) => {
    const teamToUpdate = teams.find((team) => team.id === id);
    const newTeamData = {
      ...teamToUpdate,
      played: parseInt(updatedData.played),
      goalsScored: parseInt(updatedData.goalsScored),
      goalsConceded: parseInt(updatedData.goalsConceded),
      points: parseInt(updatedData.points),
    };

    fetch(`https://epl-backend.vercel.app/teams${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeamData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTeams(teams.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTeam(null);
      })
      .catch((err) => console.error("Error updating team:", err));
  };

  const handleCancel = () => {
    setEditingTeam(null);
    setUpdatedData({ played: "", goalsScored: "", goalsConceded: "", points: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    fetch(`https://epl-backend.vercel.app/teams${id}`, { method: "DELETE" })
      .then(() => setTeams(teams.filter((t) => t.id !== id)))
      .catch((err) => console.error("Error deleting team:", err));
  };

  const handleAddTeam = () => {
    if (!newTeam.name || !newTeam.played || !newTeam.points) {
      alert("Please fill in all team details!");
      return;
    }

    fetch("https://epl-backend.vercel.app/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeam),
    })
      .then((res) => res.json())
      .then((created) => {
        setTeams([...teams, created]);
        setNewTeam({
          name: "",
          played: "",
          goalsScored: "",
          goalsConceded: "",
          points: "",
        });
      })
      .catch((err) => console.error("Error adding team:", err));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 text-center bg-blue-600">
      <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-lg">
        🏆 Premier League Table
      </h2>

      <div className="overflow-x-auto shadow-2xl rounded-xl bg-white w-11/12 lg:w-4/5 mx-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-900 text-white">
            <tr>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Team</th>
              <th className="p-3 text-left">Played</th>
              <th className="p-3 text-left">Goals Scored</th>
              <th className="p-3 text-left">Goals Conceded</th>
              <th className="p-3 text-left">Points</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams
              .sort((a, b) => b.points - a.points)
              .map((team, index) => (
                <tr
                  key={team.id}
                  className="border-b hover:bg-indigo-50 transition-colors"
                >
                  <td className="p-3 font-medium">{index + 1}</td>
                  <td className="p-3 font-semibold">{team.name}</td>

                  {editingTeam === team.id ? (
                    <>
                      <td className="p-3">
                        <input
                          type="number"
                          value={updatedData.played}
                          onChange={(e) =>
                            setUpdatedData({ ...updatedData, played: e.target.value })
                          }
                          className="border rounded px-2 py-1 w-20"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={updatedData.goalsScored}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              goalsScored: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1 w-20"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={updatedData.goalsConceded}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              goalsConceded: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1 w-20"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={updatedData.points}
                          onChange={(e) =>
                            setUpdatedData({ ...updatedData, points: e.target.value })
                          }
                          className="border rounded px-2 py-1 w-20"
                        />
                      </td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => handleSave(team.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{team.played}</td>
                      <td className="p-3">{team.goalsScored}</td>
                      <td className="p-3">{team.goalsConceded}</td>
                      <td className="p-3 font-bold text-indigo-900">{team.points}</td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(team)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(team.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
        ➕ Add New Team
      </h3>
      <div className="flex flex-wrap justify-center gap-3 mb-10 bg-white/95 p-4 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Team Name"
          value={newTeam.name}
          onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
          className="border rounded px-3 py-2 w-40 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          placeholder="Played"
          value={newTeam.played}
          onChange={(e) => setNewTeam({ ...newTeam, played: e.target.value })}
          className="border rounded px-3 py-2 w-28 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          placeholder="Goals Scored"
          value={newTeam.goalsScored}
          onChange={(e) => setNewTeam({ ...newTeam, goalsScored: e.target.value })}
          className="border rounded px-3 py-2 w-32 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          placeholder="Goals Conceded"
          value={newTeam.goalsConceded}
          onChange={(e) =>
            setNewTeam({ ...newTeam, goalsConceded: e.target.value })
          }
          className="border rounded px-3 py-2 w-36 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          placeholder="Points"
          value={newTeam.points}
          onChange={(e) => setNewTeam({ ...newTeam, points: e.target.value })}
          className="border rounded px-3 py-2 w-28 focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleAddTeam}
          className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-800 shadow-md"
        >
          Add Team
        </button>
      </div>
    </div>
  );
}

export default Table;
