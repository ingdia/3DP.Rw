"use client";

import React from 'react';
import { Building, FileText, CheckCircle, Award, ArrowRight, Download, ArrowUp } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/navigation';
import './overview.css'; // The new, premium stylesheet

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// --- DUMMY DATA ---
const dashboardData = {
  totalCompanies: 24,
  assessmentsCompleted: 18,
  certificatesIssued: 6,
  totalRecommendations: 32,
  scoreDistribution: { low: 5, medium: 7, high: 6 },
  assessmentStatus: { completed: 18, inProgress: 6 },
  recentCompanies: [
    { id: 104, name: "Quantum Analytics", score: 92, date: "2025-08-22" },
    { id: 101, name: "Future Systems Ltd.", score: 88, date: "2025-08-21" },
    { id: 102, name: "Data Solutions Co.", score: 65, date: "2025-08-20" },
    { id: 103, name: "Innovate Inc.", score: 76, date: "2025-08-18" },
    { id: 106, name: "Legacy Enterprises", score: 45, date: "2025-07-30" },
  ],
};

// --- Main Page Component ---
export default function AdminOverviewPage() {
  const router = useRouter();

  // --- Chart Configurations ---
  const barChartData = {
    labels: ['Low Tier (<50%)', 'Medium Tier (50-79%)', 'High Tier (80%+)'],
    datasets: [{
      data: [dashboardData.scoreDistribution.low, dashboardData.scoreDistribution.medium, dashboardData.scoreDistribution.high],
      backgroundColor: ['#fca5a5', '#fdba74', '#86efac'],
      borderColor: ['#ef4444', '#f97316', '#22c55e'],
      borderWidth: 1.5, borderRadius: 8,
    }],
  };

  const doughnutChartData = {
    labels: ['Completed', 'In Progress'],
    datasets: [{
      data: [dashboardData.assessmentStatus.completed, dashboardData.assessmentStatus.inProgress],
      backgroundColor: ['#22c55e', '#f59e0b'],
      borderColor: 'var(--background-white)', borderWidth: 4, hoverOffset: 8
    }],
  };
  
  const barChartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false as boolean,
        } as Partial<import('chart.js').GridLineOptions>,
      },
      x: {
        grid: {
          display: false as boolean,
        } as Partial<import('chart.js').GridLineOptions>,
      },
    },
  };
  const doughnutChartOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '70%',
    plugins: { legend: { display: true, position: 'bottom' as const, labels: { usePointStyle: true, boxWidth: 8 } } },
  };
  
  return (
    // This div is the container for the overview page content. The layout is handled by the parent.
    <div>
      <header className="page-header">
        <div className="header-welcome">
          <h1>Dashboard</h1>
          <p>A top-level view of your platform's key metrics.</p>
        </div>
        <button className="btn btn-outline">
          <Download size={16} /> Export Report
        </button>
      </header>
      
      <div className="dashboard-grid">
        {/* --- Key Metric Cards --- */}
        <div className="stat-card">
          <div className="card-header">
            <div className="icon"><Building size={18} /></div>
            <p className="card-label">Total Companies</p>
          </div>
          <p className="card-value">{dashboardData.totalCompanies}</p>
        </div>
        <div className="stat-card">
          <div className="card-header">
            <div className="icon"><CheckCircle size={18} /></div>
            <p className="card-label">Assessments Done</p>
          </div>
          <p className="card-value">{dashboardData.assessmentsCompleted}</p>
        </div>
        <div className="stat-card">
          <div className="card-header">
            <div className="icon"><Award size={18} /></div>
            <p className="card-label">Certificates Issued</p>
          </div>
          <p className="card-value">{dashboardData.certificatesIssued}</p>
        </div>
        <div className="stat-card">
          <div className="card-header">
            <div className="icon"><FileText size={18} /></div>
            <p className="card-label">Recommendations</p>
          </div>
          <p className="card-value">{dashboardData.totalRecommendations}</p>
        </div>
        
        {/* --- Charts --- */}
        <div className="chart-card bar-chart">
          <h3 className="card-title">Company Score Distribution</h3>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className="doughnut-card">
          <h3 className="card-title">Assessment Status</h3>
          <div className="doughnut-wrapper">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
        
        {/* --- Recent Activity Table --- */}
        <div className="table-card recent-companies">
          <div className="table-header">
            <h3 className="card-title">Recent Completions</h3>
            <button className="view-all-btn" onClick={() => router.push('/Admin/companies')}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-wrapper">
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Date</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentCompanies.map(company => (
                  <tr key={company.id}>
                    <td className="company-name">{company.name}</td>
                    <td>{company.date}</td>
                    <td>
                      <span className={`score-badge ${company.score >= 80 ? 'high' : company.score >= 50 ? 'medium' : 'low'}`}>
                        {company.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}