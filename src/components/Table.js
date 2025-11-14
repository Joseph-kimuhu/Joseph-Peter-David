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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://epl-backend.vercel.app/teams")
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch teams');
        return res.json();
      })
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
      played: parseInt(updatedData.played) || 0,
      goalsScored: parseInt(updatedData.goalsScored) || 0,
      goalsConceded: parseInt(updatedData.goalsConceded) || 0,
      points: parseInt(updatedData.points) || 0,
    };

    fetch(`https://epl-backend.vercel.app/teams/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeamData),
    })
    .then(res => res.json())
    .then(updated => {
      setTeams(prev => prev.map(t => t.id === updated.id ? updated : t));
      setEditingTeam(null);
    })
    .catch(err => console.error("Error updating:", err));
  };

  const handleCancel = () => {
    setEditingTeam(null);
    setUpdatedData({ played: "", goalsScored: "", goalsConceded: "", points: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this team?")) return;
    
    fetch(`https://epl-backend.vercel.app/teams/${id}`, { method: "DELETE" })
    .then(() => setTeams(prev => prev.filter(t => t.id !== id)))
    .catch(err => console.error("Error deleting:", err));
  };

  const handleAddTeam = () => {
    if (!newTeam.name || !newTeam.played || !newTeam.points) {
      alert("Please fill in all required fields!");
      return;
    }

    const teamToAdd = {
      ...newTeam,
      played: parseInt(newTeam.played) || 0,
      goalsScored: parseInt(newTeam.goalsScored) || 0,
      goalsConceded: parseInt(newTeam.goalsConceded) || 0,
      points: parseInt(newTeam.points) || 0,
    };

    fetch("https://epl-backend.vercel.app/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamToAdd),
    })
    .then(res => res.json())
    .then(created => {
      setTeams(prev => [...prev, created]);
      setNewTeam({ name: "", played: "", goalsScored: "", goalsConceded: "", points: "" });
    })
    .catch(err => console.error("Error adding:", err));
  };

  const getPositionClass = (position) => {
    if (position <= 4) return 'position-champions';
    if (position <= 6) return 'position-europa';
    if (position >= 18) return 'position-relegation';
    return 'position-normal';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-white text-xl pulse">Loading league table...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100" style={{ border: '1px solid #fca5a5', color: '#991b1b', padding: '1.5rem', borderRadius: '0.5rem' }}>
          <p style={{ fontWeight: '500' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="text-center mb-12">
        <h2 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'white', marginBottom: '1rem', textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
          🏆 Premier League Table
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.25rem', fontWeight: '500' }}>Current standings and team statistics</p>
      </div>

      <div className="card mb-8" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>📍 Pos</th>
                <th>⚽ Team</th>
                <th style={{ textAlign: 'center' }}>🎮 P</th>
                <th style={{ textAlign: 'center' }}>🥅 GF</th>
                <th style={{ textAlign: 'center' }}>🚫 GA</th>
                <th style={{ textAlign: 'center' }}>📊 GD</th>
                <th style={{ textAlign: 'center' }}>🏆 Pts</th>
                <th style={{ textAlign: 'center' }}>🔧 Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams
                .sort((a, b) => {
                  if (b.points !== a.points) return b.points - a.points;
                  const gdA = (a.goalsScored || 0) - (a.goalsConceded || 0);
                  const gdB = (b.goalsScored || 0) - (b.goalsConceded || 0);
                  if (gdB !== gdA) return gdB - gdA;
                  return (b.goalsScored || 0) - (a.goalsScored || 0);
                })
                .map((team, index) => {
                  const position = index + 1;
                  const goalDifference = (team.goalsScored || 0) - (team.goalsConceded || 0);
                  
                  return (
                    <tr key={team.id}>
                      <td>
                        <span className={getPositionClass(position)} style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '2rem',
                          fontSize: '0.875rem',
                          fontWeight: '700'
                        }}>
                          {position}
                        </span>
                      </td>
                      
                      {editingTeam === team.id ? (
                        <>
                          <td style={{ fontWeight: '600' }}>{team.name}</td>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="number"
                              value={updatedData.played}
                              onChange={(e) => setUpdatedData({ ...updatedData, played: e.target.value })}
                              className="input-field"
                              style={{ width: '4rem', textAlign: 'center' }}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="number"
                              value={updatedData.goalsScored}
                              onChange={(e) => setUpdatedData({ ...updatedData, goalsScored: e.target.value })}
                              className="input-field"
                              style={{ width: '4rem', textAlign: 'center' }}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="number"
                              value={updatedData.goalsConceded}
                              onChange={(e) => setUpdatedData({ ...updatedData, goalsConceded: e.target.value })}
                              className="input-field"
                              style={{ width: '4rem', textAlign: 'center' }}
                            />
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: '600' }}>
                            {(parseInt(updatedData.goalsScored) || 0) - (parseInt(updatedData.goalsConceded) || 0)}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="number"
                              value={updatedData.points}
                              onChange={(e) => setUpdatedData({ ...updatedData, points: e.target.value })}
                              className="input-field"
                              style={{ width: '4rem', textAlign: 'center' }}
                            />
                          </td>
                          <td>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                              <button onClick={() => handleSave(team.id)} className="btn-success btn-small">💾 Save</button>
                              <button onClick={handleCancel} className="btn-secondary btn-small">❌ Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ fontWeight: '600', color: '#1a202c' }}>{team.name}</td>
                          <td style={{ textAlign: 'center', fontWeight: '500' }}>{team.played || 0}</td>
                          <td style={{ textAlign: 'center', fontWeight: '600', color: '#48bb78' }}>{team.goalsScored || 0}</td>
                          <td style={{ textAlign: 'center', fontWeight: '600', color: '#f56565' }}>{team.goalsConceded || 0}</td>
                          <td style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            color: goalDifference > 0 ? '#48bb78' : goalDifference < 0 ? '#f56565' : '#718096'
                          }}>
                            {goalDifference > 0 ? '+' : ''}{goalDifference}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#667eea' }}>
                              {team.points || 0}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                              <button onClick={() => handleEdit(team)} className="btn-primary btn-small">✏️ Edit</button>
                              <button onClick={() => handleDelete(team.id)} className="btn-danger btn-small">🗑️ Delete</button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#2d3748', marginBottom: '1.5rem', textAlign: 'center' }}>
          ➕ Add New Team
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6" style={{ alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>⚽ Team Name *</label>
            <input
              type="text"
              placeholder="Enter team name"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>🎮 Played *</label>
            <input
              type="number"
              placeholder="Matches played"
              value={newTeam.played}
              onChange={(e) => setNewTeam({ ...newTeam, played: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>🥅 Goals For</label>
            <input
              type="number"
              placeholder="Goals scored"
              value={newTeam.goalsScored}
              onChange={(e) => setNewTeam({ ...newTeam, goalsScored: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>🚫 Goals Against</label>
            <input
              type="number"
              placeholder="Goals conceded"
              value={newTeam.goalsConceded}
              onChange={(e) => setNewTeam({ ...newTeam, goalsConceded: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>🏆 Points *</label>
            <input
              type="number"
              placeholder="Total points"
              value={newTeam.points}
              onChange={(e) => setNewTeam({ ...newTeam, points: e.target.value })}
              className="input-field"
            />
          </div>
          <button onClick={handleAddTeam} className="btn-primary btn-large w-full">🚀 Add Team</button>
        </div>
      </div>

      {teams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-xl">📋 No teams found.</p>
        </div>
      )}
    </div>
  );
}

export default Table;