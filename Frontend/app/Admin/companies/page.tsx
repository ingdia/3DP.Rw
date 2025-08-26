"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import './companies.css'; // The new, refined stylesheet

// --- Interfaces ---
interface Company {
  id: number;
  name: string;
  contactEmail: string;
  hasTakenAssessment: boolean;
  resultsDelivered: boolean;
  overallScore: number | null; 
  
}

// --- DUMMY DATA ---
// Updated to reflect the new data structure an admin would actually need
const allCompanies: Company[] = [
  { id: 101, name: "Future Systems Ltd.", contactEmail: "contact@futuresystems.com", hasTakenAssessment: true, resultsDelivered: true, overallScore: 88 },
  { id: 102, name: "Data Solutions Co.", contactEmail: "info@datasolutions.co", hasTakenAssessment: true, resultsDelivered: false, overallScore: 65 },
  { id: 103, name: "Innovate Inc.", contactEmail: "hello@innovate.com", hasTakenAssessment: true, resultsDelivered: true, overallScore: 76 },
  { id: 104, name: "Quantum Analytics", contactEmail: "support@quantum.ai", hasTakenAssessment: true, resultsDelivered: false, overallScore: 92 },
  { id: 105, name: "Global Tech Group", contactEmail: "admin@globaltech.com", hasTakenAssessment: false, resultsDelivered: false, overallScore: null },
  { id: 106, name: "Legacy Enterprises", contactEmail: "contact@legacy.com", hasTakenAssessment: true, resultsDelivered: true, overallScore: 45 },
  { id: 107, name: "NextGen Innovations", contactEmail: "team@nextgen.io", hasTakenAssessment: false, resultsDelivered: false, overallScore: null },
];

// --- Main Page Component ---
export default function CompaniesDashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // --- Filtering Logic ---
  const filteredCompanies = useMemo(() => {
    return [...allCompanies].filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="companies-page-container">
      <header className="page-header">
        <h1 className="page-title">Company Directory</h1>
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <div className="table-card">
        <div className="table-wrapper">
          <table className="companies-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Contact Email</th>
                <th>Assessment Taken</th>
                <th>Overall Score</th>
                <th>Results Delivered</th>
                <th></th> {/* Empty header for the action button */}
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id}>
                    <td className="company-name-cell">{company.name}</td>
                    <td>{company.contactEmail}</td>
                    <td>
                      <span className={`status-badge ${company.hasTakenAssessment ? 'yes' : 'no'}`}>
                        {company.hasTakenAssessment ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {company.hasTakenAssessment ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="score-cell">
                      {company.hasTakenAssessment ? `${company.overallScore}%` : '—'}
                    </td>
                    <td>
                      <span className={`status-badge ${company.resultsDelivered ? 'yes' : 'no'}`}>
                        {company.resultsDelivered ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {company.resultsDelivered ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-view" 
                        onClick={() => router.push(`/Admin/companies/${company.id}`)}
                        // Disable the button if the assessment hasn't been taken
                        disabled={!company.hasTakenAssessment}
                      >
                        View Results
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-results-cell">
                    No companies found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}