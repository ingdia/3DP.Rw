"use client";

import React from 'react';
import { Award, BarChart, CheckCircle, FileText } from 'lucide-react';
import './results.css'; // We will create this CSS file next

// --- DUMMY DATA ---
// Represents the data you'll eventually fetch from your backend for a specific company's assessment.
const assessmentResult = {
  companyName: "Innovate Inc.",
  assessmentDate: "August 22, 2025",
  overallScore: 76, // Note: This score is < 80, so it's not eligible for a certificate.
  resultsByCapability: [
    { id: 1, name: "Data Governance", score: 85, summary: "Strong policies and data quality checks are in place." },
    { id: 2, name: "Data Security & Privacy", score: 92, summary: "Excellent implementation of access control and encryption." },
    { id: 3, name: "Data Leadership & Culture", score: 55, summary: "Opportunities for improving data literacy across the organization." },
    { id: 4, name: "Analytics & Visualization", score: 72, summary: "Good reporting capabilities, with potential for more advanced predictive analytics." }
  ],
  recommendations: "A full recommendation guide will be provided by your administrator.",
};

// --- Main Page Component ---
export default function AssessmentResultsPage() {
  return (
    <div className="results-page-container">
      <header className="results-header">
        <div>
          <h1 className="company-name">{assessmentResult.companyName}</h1>
          <p className="assessment-date">Assessment Completed: {assessmentResult.assessmentDate}</p>
        </div>
        <button className="btn btn-outline">
          <FileText size={16} /> Download Report
        </button>
      </header>

      <div className="results-grid">
        {/* Overall Score Card */}
        <div className="card overall-score-card">
          <h2 className="card-title">Overall Data Maturity Score</h2>
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="score-svg">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                className="circle-progress"
                strokeDasharray={`${assessmentResult.overallScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="score-text">{assessmentResult.overallScore}%</span>
          </div>
          <p className="score-summary">
            This score reflects your organization's overall effectiveness in leveraging data assets.
          </p>
        </div>

        {/* Certificate Status Card */}
        <div className="card certificate-status-card">
           <h2 className="card-title">Certificate Status</h2>
           {assessmentResult.overallScore >= 80 ? (
            <div className="status-content success">
                <Award size={48} />
                <h3>Congratulations!</h3>
                <p>You have achieved Data Maturity Excellence and are eligible for a certificate.</p>
            </div>
           ) : (
             <div className="status-content pending">
                <BarChart size={48} />
                <h3>Almost There!</h3>
                <p>A score of <strong>80%</strong> or higher is required for a certificate. View your recommendations to see how you can improve.</p>
             </div>
           )}
        </div>
      </div>

      {/* Breakdown by Capability */}
      <div className="card capabilities-breakdown-card">
        <h2 className="card-title">Breakdown by Capability</h2>
        <div className="capabilities-list">
          {assessmentResult.resultsByCapability.map(cap => (
            <div key={cap.id} className="capability-item">
              <div className="capability-info">
                <h3 className="capability-name">{cap.name}</h3>
                <span className="capability-score">{cap.score}%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${cap.score}%` }}></div>
              </div>
              <p className="capability-summary">{cap.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}