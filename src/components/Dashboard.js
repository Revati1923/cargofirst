


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import JobForm from './JobForm';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs/myjobs');
        if (mounted) setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();

    const onJobsUpdated = () => fetchJobs();
    window.addEventListener('jobsUpdated', onJobsUpdated);

    return () => {
      mounted = false;
      window.removeEventListener('jobsUpdated', onJobsUpdated);
    };
  }, []);

  return (
    <>
      <style>{`
        
        .dash-wrapper {
          width: 100%;
          height: 100vh;
          display: flex;
          background: #557da5ff;;
          font-family: Poppins, sans-serif;
        }

       
        .sidebar {
          width: 260px;
          background:  #557da5ff;;
          padding: 20px;
          border-right: 1px solid #ddd;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
        }

        .sidebar h3 {
          margin-bottom: 18px;
          font-size: 20px;
          color: #fff;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
        }

        .sidebar-menu li {
          margin-bottom: 12px;
        }

        .nav-link {
          display: block;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          transition: 0.3s;
        }

        .nav-link:hover {
          background: #eef2ff;
          color:#84c3f4ff;;
        }

        .btn {
          width: 100%;
          padding: 10px;
          border: none;
          background: #4f46e5;
          color: white;
          border-radius: 6px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 8px;
        }

        .btn:hover {
          background: #84c3f4ff;;
        }

        
        .main-content {
          margin-left: 290px; 
          width: calc(100% - 200px);
          padding: 20px;
          overflow-y: auto;
          height: 80vh;
        }

        .page-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .job-card {
          background: #fff;
          padding: 7px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.07);
          transition: 0.3s;
        }

        .job-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        .job-title {
          margin-bottom: 5px;
          font-size: 17px;
          font-weight: 600;
        }

        .job-desc {
          font-size: 14px;
          color: #555;
          margin-bottom: 8px;
        }

        .job-meta span {
          display: block;
          font-size: 13px;
          color: #666;
        }

    
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            border-right: none;
          }
          .main-content {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>

      <div className="dash-wrapper">
      
        <aside className="sidebar">
          <h3>Dashboard</h3>
          <ul className="sidebar-menu">
            <li><Link className="nav-link" to="/dashboard">Jobs</Link></li>
            <li><Link className="nav-link" to="/profile">Profile</Link></li>
            <li><Link className="nav-link" to="/analysis">Customer Analysis</Link></li>
            <li>
              <button className="btn" onClick={() => {
                localStorage.removeItem('token');
                window.location = '/';
              }}>
                Logout
              </button>
            </li>
          </ul>
        </aside>

        
        <main className="main-content">
          <h2 className="page-title">Job Postings</h2>
          <JobForm />

          <div className="jobs-grid">
            {jobs.map(job => (
              <div key={job._id} className="job-card">
                <h3 className="job-title">{job.jobTitle}</h3>
                <p className="job-desc">{job.jobDescription}</p>
                <div className="job-meta">
                  <span>🏢 {job.companyName}</span>
                  <span>📍 {job.location}</span>
                  <span>⏳ {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

