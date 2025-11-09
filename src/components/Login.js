import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/login', form);
      if (res.data?.token) localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 80px); /* To avoid Navbar overlap */
          background: #557da5ff;
          padding-top: 20px;
        }
        .card {
          background: white;
          width: 360px;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .text-center { text-align: center; }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          margin-top: 10px;
          display: block;
          color: #333;
        }
        .form-input {
          width: 100%;
          padding: 11px;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          margin-top: 5px;
          margin-bottom: 12px;
          outline: none;
          font-size: 15px;
          transition: 0.3s;
        }
        .form-input:focus {
          border-color: #252527ff;
          box-shadow: 0 0 4px rgba(99,102,241,0.4);
        }
        .btn {
          width: 100%;
          background: #4f46e5;
          border: none;
          padding: 12px;
          color: white;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: 600;
          margin-top: 6px;
        }
        .btn:hover { background: #4338ca; }

        .form-error {
          background: #ded3d3ff;
          color: #b91c1c;
          padding: 10px;
          border-radius: 6px;
          margin: 8px 0;
          text-align: center;
          font-size: 14px;
          border-left: 4px solid #b91c1c;
        }

        .form-footer {
          margin-top: 14px;
          font-size: 14px;
        }
        .form-footer a {
          color: #4f46e5;
          font-weight: 600;
          text-decoration: none;
        }
        .form-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-page">
        <div className="card">
          <h2 className="text-center">Sign in to your account</h2>

          {err && <div className="form-error">{err}</div>}

          <form onSubmit={onSubmit}>
            <label className="form-label">Email</label>
            <input className="form-input" name="email" placeholder="Enter email" value={form.email} onChange={onChange} required />

            <label className="form-label">Password</label>
            <input className="form-input" name="password" type="password" placeholder="Enter password" value={form.password} onChange={onChange} required autoComplete="current-password" />

            <button className="btn" type="submit">Sign In</button>
          </form>

          <div className="text-center form-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}
