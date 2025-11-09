// 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  return (
    <>
      <style>{`
        header {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          background:  #e6eeefff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .site-header {
          max-width: 1100px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
        }

        .brand {
          font-size: 22px;
          font-weight: 700;
          color: #181717ff;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          text-decoration: none;
          color: #1e1b1bff;
          font-size: 16px;
          font-weight: 500;
          transition: 0.3s ease;
        }

        .nav-link:hover {
          color: #4f46e5;
        }

        .btn {
          border: none;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
        }

        .btn.secondary {
          background: #f3f4f6;
        }

        .mobile-toggle {
          display: none;
          font-size: 26px;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }

          .nav-links {
            position: absolute;
            top: 64px;
            right: 0;
            flex-direction: column;
            background: white;
            width: 200px;
            padding: 18px;
            transform: translateX(110%);
            opacity: 0;
            transition: 0.3s ease-in-out;
            box-shadow: -2px 6px 18px rgba(0,0,0,0.15);
            border-radius: 0 0 0 12px;
          }

          .nav-links.open {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* FIX CONTENT OVERLAP */
        body {
          margin: 0;
          padding-top: 80px;
        }
      `}</style>

      <header>
        <div className="site-header">
          <div className="brand">Job Portal</div>

          <button className="mobile-toggle" onClick={() => setOpen(!open)}>
            ☰
          </button>

          <nav className={`nav-links ${open ? 'open' : ''}`}>
            <Link className="nav-link" to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link className="nav-link" to="/analysis" onClick={() => setOpen(false)}>Analysis</Link>
            <Link className="nav-link" to="/profile" onClick={() => setOpen(false)}>Profile</Link>
            <button onClick={handleLogout} className="btn secondary">Logout</button>
          </nav>
        </div>
      </header>
    </>
  );
}
