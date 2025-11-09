import React, { useState } from 'react';
import api from '../utils/api';

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    companyName: '',
    location: '',
    deadline: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', formData);

      setFormData({
        jobTitle: '',
        jobDescription: '',
        companyName: '',
        location: '',
        deadline: '',
      });

      window.dispatchEvent(new Event('jobsUpdated'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>{`
        .job-card {
          background:#fff;
          padding:20px;
          border-radius:10px;
          box-shadow:0 2px 8px rgba(0,0,0,0.08);
          margin-bottom:20px;
        }
        .job-card h3 {
          text-align:center;
          margin-bottom:15px;
          color:#222;
        }
        .job-form {
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .job-label {
          font-size:14px;
          font-weight:500;
          color:#333;
        }
        .job-input,
        .job-textarea {
          width:100%;
          padding:10px;
          border:1px solid #ddd;
          border-radius:6px;
          font-size:15px;
          outline:none;
          transition:0.2s;
        }
        .job-input:focus,
        .job-textarea:focus {
          border-color:#4f46e5;
          box-shadow:0 0 4px rgba(79,70,229,0.4);
        }
        .job-textarea {
          min-height:90px;
          resize:none;
        }
        .job-btn {
          background:#4f46e5;
          color:#fff;
          padding:10px;
          border:none;
          border-radius:6px;
          font-size:15px;
          cursor:pointer;
          transition:0.3s;
          font-weight:500;
        }
        .job-btn:hover {
          background:#4338ca;
        }
      `}</style>

      <div className="job-card">
        <h3>Post a New Job</h3>

        <form onSubmit={handleSubmit} className="job-form">
          <label className="job-label">Job Title</label>
          <input
            className="job-input"
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />

          <label className="job-label">Job Description</label>
          <textarea
            className="job-textarea"
            name="jobDescription"
            placeholder="Enter job description"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          />

          <label className="job-label">Company Name</label>
          <input
            className="job-input"
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={handleChange}
          />

          <label className="job-label">Location</label>
          <input
            className="job-input"
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
          />

          <label className="job-label">Deadline</label>
          <input
            className="job-input"
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

          <button className="job-btn" type="submit">Post Job</button>
        </form>
      </div>
    </>
  );
};

export default JobForm;


