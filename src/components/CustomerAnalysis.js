import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CustomerAnalysis = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/jobs/analytics');
        setAnalyticsData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  const chartData = {
    labels: analyticsData?.jobsByMonth.map(item => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[item._id - 1];
    }) || [],
    datasets: [
      {
        label: 'Jobs Posted',
        data: analyticsData?.jobsByMonth.map(item => item.count) || [],
        fill: false,
        borderColor: '#4f46e5',
        tension: 0.3,
      }
    ]
  };

  return (
    <>
      {/* ✅ INTERNAL CSS FIXED */}
      <style>{`
        .analysis-container {
          background:#557da5ff;;
          min-height: 100vh;
          padding: 30px 15px;
        }
        .analytics-card {
          max-width: 900px;
          margin: auto;
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .analytics-heading {
          font-size: 22px;
          text-align: center;
          margin-bottom: 18px;
          font-weight: 600;
          color: #111;
        }
        .analytics-stats {
          display: flex;
          justify-content: center;
          margin-bottom: 22px;
        }
        .stat-card {
          background: #eef2ff;
          padding: 15px 24px;
          border-radius: 10px;
          min-width: 200px;
          text-align: center;
          border-left: 5px solid #4f46e5;
          box-shadow: 0px 2px 6px rgba(0,0,0,0.05);
        }
        .stat-heading {
          font-size: 15px;
          color: #444;
          margin-bottom: 5px;
        }
        .stat-value {
          font-size: 26px;
          font-weight: 700;
          color: #4f46e5;
        }
        .analytics-chart {
          background: #fff;
          padding: 18px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }
        .chart-heading {
          font-size: 17px;
          margin-bottom: 12px;
          font-weight: 600;
          color: #222;
        }
      `}</style>

      {/* ✅ Page UI without breaking Navbar */}
      <div className="analysis-container">
        <div className="analytics-card">
          <h2 className="analytics-heading">Customer Analysis</h2>

          <div className="analytics-stats">
            <div className="stat-card">
              <h3 className="stat-heading">Total Jobs Posted</h3>
              <p className="stat-value">{analyticsData?.totalJobs || 0}</p>
            </div>
          </div>

          <div className="analytics-chart">
            <h3 className="chart-heading">Jobs Posted by Month</h3>
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAnalysis;
