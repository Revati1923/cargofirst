
import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', companyName: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/register', form);
      if (res.data?.token) localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <>
      <style>{`
        .register-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 80px);
          background:#557da5ff;
          padding-top: 20px;
        }

        .card {
          background: white;
          width: 370px;
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
          border-color: #6366f1;
          box-shadow: 0 0 4px rgba(99,102,241,0.4);
        }

        .btn {
          width: 100%;
          background: #9490dcff;
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

        .btn:hover {
          background: #84c3f4ff;
          transform: translateY(-1px);
        }

        .form-error {
          background: #fee2e2;
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

      <div className="register-page">
        <div className="card">
          <h2 className="text-center">Create your account</h2>

          {err && <div className="form-error">{err}</div>}

          <form onSubmit={onSubmit}>
            <label className="form-label">Full Name</label>
            <input className="form-input" name="name" placeholder="Full Name" value={form.name} onChange={onChange} required />

            <label className="form-label">Company (optional)</label>
            <input className="form-input" name="companyName" placeholder="Company Name (optional)" value={form.companyName} onChange={onChange} />

            <label className="form-label">Email</label>
            <input className="form-input" name="email" placeholder="Enter Email" value={form.email} onChange={onChange} required />

            <label className="form-label">Password</label>
            <input className="form-input" name="password" type="password" placeholder="Create Password" value={form.password} onChange={onChange} required autoComplete="new-password" />

            <button className="btn" type="submit">Create Account</button>
          </form>

          <div className="text-center form-footer">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
