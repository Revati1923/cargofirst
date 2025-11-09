import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (error) {
        setErr('Could not fetch profile');
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      {/* ✅ INTERNAL CSS FIXED */}
      <style>{`
        .profile-container {
          background:#557da5ff;
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
        }
        .profile-card {
          width:100%;
          max-width:420px;
          background:#fff;
          border-radius:12px;
          padding:22px;
          box-shadow:0px 4px 12px rgba(0,0,0,0.12);
          animation:fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {opacity:0; transform:translateY(10px);}
          to {opacity:1; transform:translateY(0);}
        }
        .profile-card h2 {
          text-align:center;
          margin-bottom:18px;
          font-size:22px;
          color:#111;
        }
        .profile-body {
          display:flex;
          flex-direction:column;
          gap:12px;
          margin-bottom:18px;
        }
        .profile-row {
          background:#f9fafb;
          padding:10px 14px;
          border-radius:8px;
          font-size:15px;
          border-left:4px solid #4f46e5;
        }
        .profile-row strong {
          color:#333;
        }
        .profile-actions {
          display:flex;
          justify-content:center;
          margin-top:10px;
        }
        .btn {
          border:none;
          padding:8px 16px;
          font-size:15px;
          cursor:pointer;
          border-radius:6px;
          font-weight:500;
        }
        .btn.secondary {
          background:#4f46e5;
          color:#fff;
          transition:0.3s;
        }
        .btn.secondary:hover {
          background:#4338ca;
        }
        .form-error {
          background:#fee2e2;
          color:#991b1b;
          padding:10px;
          border-left:4px solid red;
          border-radius:6px;
          margin-bottom:14px;
          font-size:14px;
        }
      `}</style>

      {/* ✅ PROFILE UI */}
      <div className="profile-container">
        <div className="profile-card">
          <h2>Profile</h2>

          {err && <div className="form-error">{err}</div>}

          {user ? (
            <div className="profile-body">
              <div className="profile-row"><strong>Name:</strong> {user.name}</div>
              <div className="profile-row"><strong>Email:</strong> {user.email}</div>
              <div className="profile-row"><strong>Company:</strong> {user.companyName || '—'}</div>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#555" }}>Loading profile...</p>
          )}

          <div className="profile-actions">
            <button className="btn secondary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
