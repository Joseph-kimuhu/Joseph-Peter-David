import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://epl-backend.vercel.app/teams/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Team not found');
        return res.json();
      })
      .then((data) => {
        setTeam(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin" style={{
            width: '4rem', height: '4rem', border: '2px solid transparent',
            borderTop: '2px solid white', borderRadius: '50%', margin: '0 auto 1rem'
          }}></div>
          <p className="text-white text-xl">Loading team details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100" style={{ border: '1px solid #fca5a5', color: '#991b1b', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <p style={{ fontWeight: '500' }}>Error: {error}</p>
          </div>
          <Link to="/" className="btn-primary">← Back to Teams</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <Link to="/" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center' }}>
          ← Back to Teams
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div className="text-center mb-8">
          <img
            src={team.logo || '/api/placeholder/150/150'}
            alt={team.name}
            style={{
              width: '8rem',
              height: '8rem',
              objectFit: 'contain',
              margin: '0 auto 1.5rem',
              transition: 'transform 0.3s ease'
            }}
            onError={(e) => {
              e.target.src = '/api/placeholder/150/150';
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{team.name}</h1>
          <p className="text-xl text-gray-600 mb-4">🏟️ {team.stadium || 'Stadium TBA'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div style={{
            background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2563eb' }}>{team.points || 0}</div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Points</div>
          </div>
          <div style={{
            background: 'linear-gradient(to bottom right, #dcfce7, #bbf7d0)',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>{team.played || 0}</div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Matches Played</div>
          </div>
          <div style={{
            background: 'linear-gradient(to bottom right, #f3e8ff, #e9d5ff)',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#9333ea' }}>{team.goalsScored || 0}</div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Goals Scored</div>
          </div>
          <div style={{
            background: 'linear-gradient(to bottom right, #fee2e2, #fecaca)',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>{team.goalsConceded || 0}</div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Goals Conceded</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
              🏆 <span style={{ marginLeft: '0.5rem' }}>Trophies</span>
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {team.trophies && team.trophies.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {team.trophies.map((trophy, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#eab308', borderRadius: '50%', marginRight: '0.75rem' }}></span>
                      {trophy}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No trophies listed.</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
              ⭐ <span style={{ marginLeft: '0.5rem' }}>Club Legends</span>
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {team.legends && team.legends.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {team.legends.map((legend, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#3b82f6', borderRadius: '50%', marginRight: '0.75rem' }}></span>
                      {legend}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No legends listed.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
            ℹ️ <span style={{ marginLeft: '0.5rem' }}>Team Information</span>
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Founded:</span>
                <span style={{ marginLeft: '0.5rem', color: '#4b5563' }}>{team.founded || 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Stadium Capacity:</span>
                <span style={{ marginLeft: '0.5rem', color: '#4b5563' }}>{team.capacity || 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Manager:</span>
                <span style={{ marginLeft: '0.5rem', color: '#4b5563' }}>{team.manager || 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Goal Difference:</span>
                <span style={{
                  marginLeft: '0.5rem',
                  fontWeight: '500',
                  color: ((team.goalsScored || 0) - (team.goalsConceded || 0)) > 0 
                    ? '#059669' 
                    : ((team.goalsScored || 0) - (team.goalsConceded || 0)) < 0 
                    ? '#dc2626' 
                    : '#4b5563'
                }}>
                  {((team.goalsScored || 0) - (team.goalsConceded || 0)) > 0 ? '+' : ''}
                  {(team.goalsScored || 0) - (team.goalsConceded || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;