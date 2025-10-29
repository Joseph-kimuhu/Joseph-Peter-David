
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

  // Load fixtures
  useEffect(() => {
    fetch("http://localhost:3001/fixtures")
      .then((res) => res.json())
      .then(setFixtures)
      .catch((err) => console.error("Error loading fixtures:", err));
  }, []);

  // Handle edit
  const handleEdit = (fixture) => setEditingFixture({ ...fixture });

  // Handle save
  const handleSave = () => {
    if (!editingFixture) return;

    fetch(`http://localhost:3001/fixtures/${editingFixture.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingFixture),
    })
      .then((res) => res.json())
      .then((updated) => {
        setFixtures(
          fixtures.map((f) => (f.id === updated.id ? updated : f))
        );
        setEditingFixture(null);
      })
      .catch((err) => console.error("Error saving fixture:", err));
  };

  // Handle new fixture creation
  const handleCreate = () => {
    if (!newFixture.homeTeam || !newFixture.awayTeam || !newFixture.time) {
      alert("Please fill all fixture details before saving.");
      return;
    }

    fetch("http://localhost:3001/fixtures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFixture),
    })
      .then((res) => res.json())
      .then((created) => {
        setFixtures([...fixtures, created]);
        setNewFixture({ homeTeam: "", awayTeam: "", time: "", score: "" });
      })
      .catch((err) => console.error("Error creating fixture:", err));
  };

  // Handle delete
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/fixtures/${id}`, { method: "DELETE" })
      .then(() => setFixtures(fixtures.filter((f) => f.id !== id)))
      .catch((err) => console.error("Error deleting fixture:", err));
  };

  return (
    <div className="text-center p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">
        Premier League Fixtures
      </h2>

      {/* Fixtures Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white mx-auto w-11/12">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-indigo-900 text-white text-left">
              <th className="p-3">Home Team</th>
              <th className="p-3">Away Team</th>
              <th className="p-3">Match Time</th>
              <th className="p-3">Score</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((fixture) =>
              editingFixture && editingFixture.id === fixture.id ? (
                <tr key={fixture.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editingFixture.homeTeam}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          homeTeam: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editingFixture.awayTeam}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          awayTeam: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="datetime-local"
                      className="border rounded px-2 py-1 w-full"
                      value={editingFixture.time}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          time: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editingFixture.score}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          score: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingFixture(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={fixture.id}
                  className="border-b hover:bg-gray-50 text-gray-800"
                >
                  <td className="p-3">{fixture.homeTeam}</td>
                  <td className="p-3">{fixture.awayTeam}</td>
                  <td className="p-3">
                    {new Date(fixture.time).toLocaleString()}
                  </td>
                  <td className="p-3">{fixture.score || "-"}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(fixture)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(fixture.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Create Fixture */}
      <h3 className="text-2xl font-semibold text-indigo-700 mt-10 mb-3">
        Create New Fixture
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        <input
          placeholder="Home Team"
          value={newFixture.homeTeam}
          onChange={(e) =>
            setNewFixture({ ...newFixture, homeTeam: e.target.value })
          }
          className="border rounded px-3 py-2 w-40 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Away Team"
          value={newFixture.awayTeam}
          onChange={(e) =>
            setNewFixture({ ...newFixture, awayTeam: e.target.value })
          }
          className="border rounded px-3 py-2 w-40 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="datetime-local"
          value={newFixture.time}
          onChange={(e) =>
            setNewFixture({ ...newFixture, time: e.target.value })
          }
          className="border rounded px-3 py-2 w-56 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Score"
          value={newFixture.score}
          onChange={(e) =>
            setNewFixture({ ...newFixture, score: e.target.value })
          }
          className="border rounded px-3 py-2 w-24 focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleCreate}
          className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-800"
        >
          Create Fixture
        </button>
      </div>
    </div>
  );
}

export default Fixtures;
