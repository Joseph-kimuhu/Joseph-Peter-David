import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Teams() {
  const [teams, setTeams] = useState([]);
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
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-white text-xl pulse">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          color: '#991b1b',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }}>
          <p style={{ fontWeight: '500' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="text-center mb-12">
        <h2 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: 'white',
          marginBottom: '1rem',
          textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
          🏆 Premier League Teams
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.25rem', fontWeight: '500' }}>
          Discover all 20 Premier League clubs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teams.map((team) => (
          <div key={team.id} className="card text-center" style={{
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
          }}>
            <div className="mb-6">
              <div style={{
                width: '7rem',
                height: '7rem',
                margin: '0 auto 1rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem'
              }}>
                <img
                  src={team.logo || '/api/placeholder/120/120'}
                  alt={team.name}
                  style={{
                    width: '5rem',
                    height: '5rem',
                    objectFit: 'contain',
                    borderRadius: '50%',
                    background: 'white',
                    padding: '0.25rem'
                  }}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/120/120';
                  }}
                />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2d3748', marginBottom: '0.75rem' }}>{team.name}</h3>
              <p style={{ color: '#718096', marginBottom: '0.5rem', fontWeight: '500' }}>🏟️ {team.stadium || 'Stadium TBA'}</p>
              <p style={{ color: '#718096', fontWeight: '500' }}>📅 Founded: {team.founded || 'N/A'}</p>
            </div>
            
            <Link to={`/teams/${team.id}`}>
              <button className="btn-primary btn-large w-full">
                🔍 View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
      
      {teams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-xl">📋 No teams found.</p>
        </div>
      )}
    </div>
  );
}

export default Teams;