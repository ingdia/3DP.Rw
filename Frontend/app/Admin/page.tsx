"use client";

import React from "react";
import Link from "next/link";


interface Capability {
  id: string;
  name: string;
  sub: string[];
}

interface Question {
  id: number;
  text: string;
  capability: string;
  subCapability?: string;
}

const mockCapabilities: Capability[] = [
  { id: "1", name: "Data Analysis", sub: ["Excel", "Python", "SQL"] },
  { id: "2", name: "Machine Learning", sub: ["Supervised", "Unsupervised"] },
];

const mockQuestions: Question[] = [
  { id: 1, text: "What is a pivot table used for?", capability: "Data Analysis", subCapability: "Excel" },
  { id: 2, text: "Which algorithm is supervised learning?", capability: "Machine Learning", subCapability: "Supervised" },
];

export default function OverviewPage() {
  return (
    <div className="overview-container">
      <h1 className="overview-title">Admin Dashboard Overview</h1>

      <div className="overview-cards">
        <div className="card">
          <h2>{mockQuestions.length}</h2>
          <p>Total Questions</p>
        </div>
        <div className="card">
          <h2>{mockCapabilities.length}</h2>
          <p>Total Capabilities</p>
        </div>
        <div className="card">
          <h2>{mockCapabilities.reduce((acc, c) => acc + c.sub.length, 0)}</h2>
          <p>Total Sub-Capabilities</p>
        </div>
      </div>

      <div className="overview-actions">
        <Link href="/Admin/questions/questionsForm">
          <button className="btn-primary">+ Add Question</button>
        </Link>
        <Link href="/Admin/questions/questionBank">
          <button className="btn-secondary">View Question Bank</button>
        </Link>
      </div>
    </div>
  );
}
