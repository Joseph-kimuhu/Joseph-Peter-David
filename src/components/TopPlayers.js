import React, { useEffect, useState } from "react";

function TopPlayers() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    club: "",
    goals: "",
    assists: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://epl-backend.vercel.app/topPlayers")
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch players');
        return res.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (player) => setEditingPlayer({ ...player });

  const handleSave = () => {
    if (!editingPlayer) return;

    fetch(`https://epl-backend.vercel.app/topPlayers/${editingPlayer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingPlayer)
    })
    .then(res => res.json())
    .then(updated => {
      setPlayers(prev => prev.map(p => p.id === updated.id ? updated : p));
      setEditingPlayer(null);
    })
    .catch(err => console.error("Error saving:", err));
  };

  const handleCreate = () => {
    if (!newPlayer.name || !newPlayer.club || !newPlayer.goals) {
      alert("Please fill in all required fields!");
      return;
    }

    fetch("https://epl-backend.vercel.app/topPlayers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newPlayer,
        goals: parseInt(newPlayer.goals) || 0,
        assists: parseInt(newPlayer.assists) || 0
      })
    })
    .then(res => res.json())
    .then(created => {
      setPlayers(prev => [...prev, created]);
      setNewPlayer({ name: "", club: "", goals: "", assists: "" });
    })
    .catch(err => console.error("Error creating:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this player?")) return;
    
    fetch(`https://epl-backend.vercel.app/topPlayers/${id}`, { method: "DELETE" })
    .then(() => setPlayers(prev => prev.filter(p => p.id !== id)))
    .catch(err => console.error("Error deleting:", err));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-white text-xl pulse">Loading players...</p>
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
          🏆 Top Premier League Players
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.25rem', fontWeight: '500' }}>Track goals, assists, and player statistics</p>
      </div>

      <div className="card mb-8" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>🏅 Rank</th>
                <th>👤 Player Name</th>
                <th>⚽ Club</th>
                <th>🥅 Goals</th>
                <th>🎯 Assists</th>
                <th style={{ textAlign: 'center' }}>🔧 Actions</th>
              </tr>
            </thead>
            <tbody>
              {players
                .sort((a, b) => (b.goals || 0) - (a.goals || 0))
                .map((player, index) =>
                editingPlayer && editingPlayer.id === player.id ? (
                  <tr key={player.id} style={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}>
                    <td style={{ fontWeight: '700', fontSize: '1.125rem' }}>#{index + 1}</td>
                    <td>
                      <input
                        className="input-field"
                        value={editingPlayer.name}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="input-field"
                        value={editingPlayer.club}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, club: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input-field"
                        value={editingPlayer.goals}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, goals: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input-field"
                        value={editingPlayer.assists || 0}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, assists: e.target.value })}
                      />
                    </td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                        <button onClick={handleSave} className="btn-success btn-small">💾 Save</button>
                        <button onClick={() => setEditingPlayer(null)} className="btn-secondary btn-small">❌ Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={player.id}>
                    <td>
                      <div className={`rank-${index < 3 ? index + 1 : 'other'}`}>
                        {index + 1}
                      </div>
                    </td>
                    <td style={{ fontWeight: '600', color: '#1a202c' }}>{player.name}</td>
                    <td>
                      <span style={{ 
                        padding: '0.5rem 1rem', 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                        color: 'white', 
                        borderRadius: '2rem', 
                        fontSize: '0.875rem', 
                        fontWeight: '600',
                        boxShadow: '0 2px 4px rgba(102, 126, 234, 0.3)'
                      }}>
                        {player.club}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#48bb78' }}>
                        {player.goals || 0}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#9333ea' }}>
                        {player.assists || 0}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                        <button onClick={() => handleEdit(player)} className="btn-primary btn-small">✏️ Edit</button>
                        <button onClick={() => handleDelete(player.id)} className="btn-danger btn-small">🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#2d3748', marginBottom: '1.5rem', textAlign: 'center' }}>
          ⭐ Add New Player
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>👤 Player Name *</label>
            <input
              placeholder="Enter player name"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>⚽ Club *</label>
            <input
              placeholder="Enter club name"
              value={newPlayer.club}
              onChange={(e) => setNewPlayer({ ...newPlayer, club: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>🥅 Goals *</label>
            <input
              type="number"
              placeholder="Goals scored"
              value={newPlayer.goals}
              onChange={(e) => setNewPlayer({ ...newPlayer, goals: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>🎯 Assists</label>
            <input
              type="number"
              placeholder="Assists made"
              value={newPlayer.assists}
              onChange={(e) => setNewPlayer({ ...newPlayer, assists: e.target.value })}
              className="input-field"
            />
          </div>
          <button onClick={handleCreate} className="btn-primary btn-large w-full">🚀 Add Player</button>
        </div>
      </div>

      {players.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-xl">📋 No players found.</p>
        </div>
      )}
    </div>
  );
}

export default TopPlayers;