"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

// Your existing CSS file
import "./questionsForm.css";

// --- Interfaces ---
interface Option {
  id: string;
  text: string;
}

interface Question {
  id?: number; // AI-generated questions won't have an ID initially
  text: string;
  options: Option[];
  correctAnswer: string;
  marks: number;
}

interface Capability {
  id: number;
  name: string;
  subCapabilities: { id: number; name: string }[];
}

// --- Main Page Component ---
export default function QuestionGenerator() {
  const router = useRouter();

  // --- State Management ---
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [selectedCap, setSelectedCap] = useState({ id: "", name: "" });
  const [selectedSubCap, setSelectedSubCap] = useState({ id: "", name: "" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchCapabilities = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authorization failed. Please log in.");
        return router.push("/login");
      }
      try {
        const res = await fetch("/api/capabilities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setCapabilities(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load capabilities.");
      }
    };
    fetchCapabilities();
  }, [router]);

  // --- Event Handlers ---
  const handleGenerate = async () => {
    if (!selectedCap.id) {
      toast.error("Please select a capability first.");
      return;
    }
    setIsGenerating(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/ai/generate-questions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          capability: selectedCap.name,
          subCapability: selectedSubCap.name || null // Send null if empty
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      // Add a temporary unique ID for React keys
      const questionsWithKeys = data.map((q: Question, index: number) => ({...q, id: index}));
      setQuestions(questionsWithKeys);
      toast.success("Questions generated! Please review and save.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("token");
    
    const promise = fetch("/api/questions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        questions,
        capabilityId: selectedCap.id,
        subCapabilityId: selectedSubCap.id || null,
      })
    }).then(res => {
      if (!res.ok) throw new Error("Failed to save questions.");
      return res.json();
    });

    toast.promise(promise, {
      loading: "Saving questions...",
      success: () => {
        router.push("/Admin/questions");
        return "Questions saved successfully!";
      },
      error: (err) => err.toString(),
    });

    promise.finally(() => setIsSaving(false));
  };

  const handleCancel = () => {
    setQuestions([]);
    setSelectedCap({ id: "", name: "" });
    setSelectedSubCap({ id: "", name: "" });
  };

  // --- Dynamic State Updaters for Questions ---
  const updateQuestionText = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };
  const updateOptionText = (qIndex: number, optId: string, value: string) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.map((o) =>
      o.id === optId ? { ...o, text: value } : o
    );
    setQuestions(updated);
  };
  const updateCorrectAnswer = (qIndex: number, optId: string) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = optId;
    setQuestions(updated);
  };
  const updateMarks = (qIndex: number, value: number) => {
    const updated = [...questions];
    updated[qIndex].marks = value;
    setQuestions(updated);
  };

  const currentCapability = capabilities.find(c => c.id === Number(selectedCap.id));

  return (
    <div className="page-container">
      <Link href="/Admin/questions">
        <button className="btn-secondary" style={{ marginBottom: "1.5rem" }}>
          ← Go Back to Question Bank
        </button>
      </Link>

      <h1 className="page-title">Generate Assessment Questions</h1>

      <div className="selectors">
        <div className="form-group">
          <label>1. Select Capability</label>
          <select
            value={selectedCap.id}
            onChange={(e) => {
              const capId = e.target.value;
              const capName = capabilities.find(c => c.id === Number(capId))?.name || "";
              setSelectedCap({ id: capId, name: capName });
              setSelectedSubCap({ id: "", name: "" });
              setQuestions([]);
            }}
            className="form-input"
          >
            <option value="">-- Select Capability --</option>
            {capabilities.map((cap) => (
              <option key={cap.id} value={cap.id}>
                {cap.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCap.id && currentCapability && (
          <div className="form-group">
            <label>2. Select Sub-Capability (Optional)</label>
            <select
              value={selectedSubCap.id}
              onChange={(e) => {
                const subCapId = e.target.value;
                const subCapName = currentCapability.subCapabilities.find(s => s.id === Number(subCapId))?.name || "";
                setSelectedSubCap({ id: subCapId, name: subCapName });
                setQuestions([]);
              }}
              className="form-input"
            >
              <option value="">-- None --</option>
              {currentCapability.subCapabilities.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedCap.id && (
        <button className="btn-primary" onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? "Generating with AI..." : "3. Generate Questions"}
        </button>
      )}

      {questions.length > 0 && (
        <div className="questions-section">
          <h2 className="section-title">Review and Edit Generated Questions</h2>
          {questions.map((q, index) => (
            <div key={q.id} className="question-card">
              <div className="question-header">
                <span className="question-number">Q{index + 1}</span>
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => updateQuestionText(index, e.target.value)}
                  className="question-input"
                  placeholder="Enter question text"
                />
              </div>

              <div className="options-group">
                {q.options.map((opt) => (
                  <div key={opt.id} className="option-item">
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => updateOptionText(index, opt.id, e.target.value)}
                      className="option-input"
                      placeholder={`Option ${opt.id}`}
                    />
                    <label className="radio-label">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctAnswer === opt.id}
                        onChange={() => updateCorrectAnswer(index, opt.id)}
                      />
                      Correct
                    </label>
                  </div>
                ))}
              </div>

              <div className="marks-group">
                <label>Marks</label>
                <input
                  type="number"
                  min={1}
                  value={q.marks}
                  onChange={(e) => updateMarks(index, parseInt(e.target.value) || 1)}
                  className="marks-input"
                />
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button className="btn-success" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save All Questions"}
            </button>
            <button className="btn-secondary" onClick={handleCancel} disabled={isSaving}>
              Cancel & Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}