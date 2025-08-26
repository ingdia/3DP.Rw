"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit, Trash2, Search, SlidersHorizontal } from 'lucide-react';
import './recommendations.css'; // We will create this dedicated CSS file

// --- Interfaces ---
interface Recommendation {
  id: number;
  title: string;
  capabilityName: string;
  tier: 'Low' | 'Medium' | 'High';
  description: string;
}

// --- DUMMY DATA ---
const allRecommendations: Recommendation[] = [
  // (Same dummy data as before)
  { id: 1, title: "Establish a Data Governance Council", capabilityName: "Data Leadership & Culture", tier: "Low", description: "Form a cross-functional council responsible for setting data policies, standards, and ensuring accountability. This is the foundational step for organizations scoring below 50%." },
  { id: 2, title: "Implement Automated Data Quality Monitoring", capabilityName: "Data Governance", tier: "Medium", description: "For organizations scoring between 50-79%, move beyond manual checks. Implement automated tools to profile data, detect anomalies, and report on quality metrics in real-time." },
  { id: 3, title: "Develop a Predictive Analytics Roadmap", capabilityName: "Analytics & Visualization", tier: "High", description: "For high-performing organizations (80%+), the next step is to formalize a strategy for leveraging predictive models to forecast trends and drive proactive decision-making." },
  { id: 4, title: "Standardize Access Control Policies", capabilityName: "Data Security & Privacy", tier: "Medium", description: "Define and enforce role-based access control (RBAC) policies across all critical data systems to ensure users can only access data relevant to their roles." },
];

// --- Main Page Component ---
export default function RecommendationsLibraryPage() {
  const router = useRouter();

  const [recommendations, setRecommendations] = useState(allRecommendations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('All');

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter(rec => {
      const matchesSearch = rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            rec.capabilityName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = filterTier === 'All' ? true : rec.tier === filterTier;
      return matchesSearch && matchesTier;
    });
  }, [recommendations, searchTerm, filterTier]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure?")) {
      setRecommendations(recommendations.filter(r => r.id !== id));
    }
  };

  return (
    <div className="rec-page-container">
      <header className="page-header">
        <h1 className="page-title">Recommendation Library</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => router.push('/Admin/recommendations/generate')}
        >
          <PlusCircle size={18} /> Generate New Recommendation
        </button>
      </header>

      <div className="controls-container">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title or capability..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-wrapper">
          <SlidersHorizontal size={18} className="filter-icon" />
          <select 
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Score Tiers</option>
            <option value="Low">Low Score Tier (&lt;50%)</option>
            <option value="Medium">Medium Score Tier (50-79%)</option>
            <option value="High">High Score Tier (80%+)</option>
          </select>
        </div>
      </div>

      <div className="rec-grid">
        {filteredRecommendations.map(rec => (
          <div key={rec.id} className="rec-card">
            <div className="card-header">
              <span className={`tier-badge tier-${rec.tier.toLowerCase()}`}>{rec.tier} Tier</span>
              <div className="card-actions">
                {/* The Edit button would also navigate to the generate page with an ID */}
                <button className="btn-icon" onClick={() => router.push(`/Admin/recommendations/generate?edit=${rec.id}`)} title="Edit">
                  <Edit size={16} />
                </button>
                <button className="btn-icon" onClick={() => handleDelete(rec.id)} title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="rec-title">{rec.title}</h3>
            <p className="rec-capability">For: <strong>{rec.capabilityName}</strong></p>
            <p className="rec-description">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}