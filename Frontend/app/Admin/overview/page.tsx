"use client";

import React from "react";
import "./overview.css"; // we'll create this CSS file

export default function Overview() {
  return (
    <div className="overview-container">
      <h1 className="overview-title">Dashboard Overview</h1>

      <div className="overview-cards">
        <div className="card">
          <h2>Total Companies</h2>
          <p>120</p>
        </div>
        <div className="card">
          <h2>Assessments Completed</h2>
          <p>85</p>
        </div>
        <div className="card">
          <h2>Pending Assessments</h2>
          <p>35</p>
        </div>
        <div className="card">
          <h2>Recommendations Issued</h2>
          <p>72</p>
        </div>
      </div>

      <div className="overview-section">
        <h2>Recent Activity</h2>
        <ul className="recent-list">
          <li>Company A completed Technology assessment</li>
          <li>Company B completed People assessment</li>
          <li>Company C received recommendation report</li>
        </ul>
      </div>
    </div>
  );
}
