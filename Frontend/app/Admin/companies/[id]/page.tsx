"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, FileText, Download, ChevronLeft, Send } from 'lucide-react';
import Certificate from '../../../components/Certificate'; // We will create this component
import './companyDetails.css';
import toast from 'react-hot-toast';

// --- DUMMY DATA ---
// We'll have two examples to show both states (eligible vs. not eligible)
const highScoringCompany = {
  id: 1,
  name: "Future Systems Ltd.",
  assessmentDate: "August 21, 2025",
  overallScore: 88, // Eligible for certificate
  // ...other results data...
};

const averageScoringCompany = {
  id: 2,
  name: "Data Solutions Co.",
  assessmentDate: "August 20, 2025",
  overallScore: 65, // Not eligible
  // ...other results data...
};

// --- Main Page Component ---
export default function CompanyDetailsPage() {
  // You would fetch this based on the ID in the URL, but for now we can toggle
  const [company, setCompany] = useState(highScoringCompany);
  const [showCertificate, setShowCertificate] = useState(false);

  const isEligible = company.overallScore >= 80;

  return (
    <div className="admin-details-page">
      <Link href="/Admin/companies" className="back-link">
        <ChevronLeft size={18} /> Back to All Companies
      </Link>
      
      <header className="page-header">
        <div>
          <h1 className="company-name">{company.name}</h1>
          <p className="assessment-info">Score: {company.overallScore}% | Assessed on: {company.assessmentDate}</p>
        </div>
      </header>

      {/* Admin Actions Card */}
      <div className="card admin-actions-card">
        <h2 className="card-title">Admin Actions</h2>
        <div className="actions-grid">
          <button
            className="action-btn"
            onClick={() => isEligible ? setShowCertificate(true) : toast.error("Score is too low to issue a certificate.")}
            disabled={!isEligible}
          >
            <Award size={20} />
            {isEligible ? "Issue Certificate" : "Not Eligible for Certificate"}
          </button>
          <button className="action-btn">
            <Download size={20} />
            Download Full Report
          </button>
          <button className="action-btn">
            <Send size={20} />
            Send Recommendations
          </button>
        </div>
      </div>

      {/* Here you would display the same results component from Part 1 */}
      <div className="results-placeholder">
        <h2>Assessment Results Preview</h2>
        <p>The detailed results breakdown for {company.name} would be displayed here, reusing the components from the company's view.</p>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="modal-overlay" onClick={() => setShowCertificate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <Certificate 
              companyName={company.name}
              score={company.overallScore}
              issueDate={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            />
            <button className="btn btn-primary download-cert-btn">Download as PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}