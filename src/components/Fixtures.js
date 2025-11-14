import React, { useEffect, useState } from "react";

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [editingFixture, setEditingFixture] = useState(null);
  const [newFixture, setNewFixture] = useState({
    homeTeam: "",
    awayTeam: "",
    time: "",
    score: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://epl-backend.vercel.app/fixtures")
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch fixtures');
        return res.json();
      })
      .then((data) => {
        setFixtures(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (fixture) => setEditingFixture({ ...fixture });

  const handleSave = () => {
    if (!editingFixture) return;
    
    fetch(`https://epl-backend.vercel.app/fixtures/${editingFixture._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingFixture),
    })
    .then(res => res.json())
    .then(updated => {
      setFixtures(prev => prev.map(f => f._id === updated._id ? updated : f));
      setEditingFixture(null);
    })
    .catch(err => console.error("Error saving:", err));
  };

  const handleCreate = () => {
    if (!newFixture.homeTeam || !newFixture.awayTeam || !newFixture.time) {
      alert("Please fill all required fields.");
      return;
    }

    fetch("https://epl-backend.vercel.app/fixtures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newFixture,
        time: new Date(newFixture.time).toISOString(),
      }),
    })
    .then(res => res.json())
    .then(created => {
      setFixtures(prev => [...prev, created]);
      setNewFixture({ homeTeam: "", awayTeam: "", time: "", score: "" });
    })
    .catch(err => console.error("Error creating:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this fixture?")) return;
    
    fetch(`https://epl-backend.vercel.app/fixtures/${id}`, { method: "DELETE" })
    .then(() => setFixtures(prev => prev.filter(f => f._id !== id)))
    .catch(err => console.error("Error deleting:", err));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-white text-xl pulse">Loading fixtures...</p>
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
          ⚽ Premier League Fixtures
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.25rem', fontWeight: '500' }}>Manage match schedules and results</p>
      </div>

      <div className="card mb-8" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>🏠 Home Team</th>
                <th>✈️ Away Team</th>
                <th>⏰ Match Time</th>
                <th>⚽ Score</th>
                <th style={{ textAlign: 'center' }}>🔧 Actions</th>
              </tr>
            </thead>
            <tbody>
              {fixtures.map((fixture) =>
                editingFixture && editingFixture._id === fixture._id ? (
                  <tr key={fixture._id} style={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}>
                    <td>
                      <input
                        className="input-field"
                        value={editingFixture.homeTeam}
                        onChange={(e) => setEditingFixture({ ...editingFixture, homeTeam: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="input-field"
                        value={editingFixture.awayTeam}
                        onChange={(e) => setEditingFixture({ ...editingFixture, awayTeam: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="datetime-local"
                        className="input-field"
                        value={editingFixture.time ? new Date(editingFixture.time).toISOString().slice(0, 16) : ""}
                        onChange={(e) => setEditingFixture({ ...editingFixture, time: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="input-field"
                        placeholder="e.g., 2-1"
                        value={editingFixture.score || ""}
                        onChange={(e) => setEditingFixture({ ...editingFixture, score: e.target.value })}
                      />
                    </td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                        <button onClick={handleSave} className="btn-success btn-small">💾 Save</button>
                        <button onClick={() => setEditingFixture(null)} className="btn-secondary btn-small">❌ Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={fixture._id}>
                    <td style={{ fontWeight: '600', color: '#1a202c' }}>{fixture.homeTeam}</td>
                    <td style={{ fontWeight: '600', color: '#1a202c' }}>{fixture.awayTeam}</td>
                    <td style={{ color: '#4a5568', fontWeight: '500' }}>{new Date(fixture.time).toLocaleString()}</td>
                    <td>
                      <span className={fixture.score ? 'status-completed' : 'status-pending'}>
                        {fixture.score || "TBD"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                        <button onClick={() => handleEdit(fixture)} className="btn-primary btn-small">✏️ Edit</button>
                        <button onClick={() => handleDelete(fixture._id)} className="btn-danger btn-small">🗑️ Delete</button>
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
          ➕ Add New Fixture
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>🏠 Home Team</label>
            <input
              placeholder="Enter home team"
              value={newFixture.homeTeam}
              onChange={(e) => setNewFixture({ ...newFixture, homeTeam: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>✈️ Away Team</label>
            <input
              placeholder="Enter away team"
              value={newFixture.awayTeam}
              onChange={(e) => setNewFixture({ ...newFixture, awayTeam: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>⏰ Match Time</label>
            <input
              type="datetime-local"
              value={newFixture.time}
              onChange={(e) => setNewFixture({ ...newFixture, time: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>⚽ Score (Optional)</label>
            <input
              placeholder="e.g., 2-1"
              value={newFixture.score}
              onChange={(e) => setNewFixture({ ...newFixture, score: e.target.value })}
              className="input-field"
            />
          </div>
          <button onClick={handleCreate} className="btn-primary btn-large w-full">🚀 Add Fixture</button>
        </div>
      </div>

      {fixtures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-xl">📋 No fixtures found.</p>
        </div>
      )}
    </div>
  );
}

export default Fixtures;