import React, { useEffect, useState } from "react";

function TopPlayers() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    club: "",
    goals: ""
  });

  
  useEffect(() => {
    fetch("https://epl-backend.vercel.app/topPlayers")
      .then((res) => res.json())
      .then(setPlayers)
      .catch((err) => console.error("Error fetching players:", err));
  }, []);

  
  const handleEdit = (player) => {
    setEditingPlayer({ ...player });
  };

  
  const handleSave = () => {
    if (!editingPlayer) return;

    fetch(`https://epl-backend.vercel.app/topPlayers${editingPlayer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingPlayer)
    })
      .then((res) => res.json())
      .then((updated) => {
        setPlayers(players.map((p) => (p.id === updated.id ? updated : p)));
        setEditingPlayer(null);
      })
      .catch((err) => console.error("Error saving player:", err));
  };

  
  const handleCreate = () => {
    if (!newPlayer.name || !newPlayer.club || !newPlayer.goals) {
      alert("Please fill in all player details!");
      return;
    }

    fetch("https://epl-backend.vercel.app/topPlayers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer)
    })
      .then((res) => res.json())
      .then((created) => {
        setPlayers([...players, created]);
        setNewPlayer({ name: "", club: "", goals: "" });
      })
      .catch((err) => console.error("Error creating player:", err));
  };

  
  const handleDelete = (id) => {
    fetch(`https://epl-backend.vercel.app/topPlayers${id}`, { method: "DELETE" })
      .then(() => setPlayers(players.filter((p) => p.id !== id)))
      .catch((err) => console.error("Error deleting player:", err));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🏆 Top Premier League Players</h2>

      <table
        border="1"
        style={{
          margin: "auto",
          width: "80%",
          borderCollapse: "collapse",
          backgroundColor: "#fff"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0B2447", color: "white" }}>
            <th>Name</th>
            <th>Club</th>
            <th>Goals</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) =>
            editingPlayer && editingPlayer.id === player.id ? (
              <tr key={player.id}>
                <td>
                  <input
                    value={editingPlayer.name}
                    onChange={(e) =>
                      setEditingPlayer({
                        ...editingPlayer,
                        name: e.target.value
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editingPlayer.club}
                    onChange={(e) =>
                      setEditingPlayer({
                        ...editingPlayer,
                        club: e.target.value
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editingPlayer.goals}
                    onChange={(e) =>
                      setEditingPlayer({
                        ...editingPlayer,
                        goals: e.target.value
                      })
                    }
                  />
                </td>
                <td>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingPlayer(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.club}</td>
                <td>{player.goals}</td>
                <td>
                  <button onClick={() => handleEdit(player)}>Edit</button>
                  <button onClick={() => handleDelete(player.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      
      <h3 style={{ marginTop: "30px" }}>Add New Player</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px"
        }}
      >
        <input
          placeholder="Player Name"
          value={newPlayer.name}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, name: e.target.value })
          }
        />
        <input
          placeholder="Club"
          value={newPlayer.club}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, club: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Goals"
          value={newPlayer.goals}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, goals: e.target.value })
          }
        />
        <button
          style={{
            backgroundColor: "#0B2447",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
          onClick={handleCreate}
        >
          New Player
        </button>
      </div>
    </div>
  );
}

export default TopPlayers;
