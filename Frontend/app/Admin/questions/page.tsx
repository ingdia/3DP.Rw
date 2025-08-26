"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";

import "./questions.css"; // The final, good stylesheet

// --- Interfaces ---
interface Option { id: number; text: string; is_correct: boolean; question_id: number; }
interface Question { id: number; text: string; capability: string; subCapability?: string; options: Option[]; correctAnswer: string; marks: number; }
interface CapabilityFilter { id: number; name: string; }

// --- Main Page Component ---
export default function QuestionBankPage() {
  const router = useRouter();

  // --- State Management ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [capabilities, setCapabilities] = useState<CapabilityFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterCapability, setFilterCapability] = useState("");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Show 5 questions per page

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authorization failed. Please log in.");
        return router.push("/login");
      }
      try {
        setLoading(true);
        const [questionsRes, capabilitiesRes] = await Promise.all([
          fetch("/api/questions", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/capabilities", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (!questionsRes.ok || !capabilitiesRes.ok) throw new Error("Failed to fetch data.");
        
        const questionsData = await questionsRes.json();
        const capabilitiesData = await capabilitiesRes.json();
        
        const formattedQuestions = questionsData.map((q: any) => {
            const correctOption = q.options?.find((opt: Option) => opt.is_correct);
            return { ...q, correctAnswer: correctOption ? correctOption.text : 'N/A' };
        });

        setQuestions(formattedQuestions);
        setCapabilities(capabilitiesData);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  // --- Filtering & Pagination Logic ---
  const filteredQuestions = useMemo(() => {
    setCurrentPage(1); // Reset page on filter change
    return questions.filter((q) => {
      const matchesSearch =
        q.text.toLowerCase().includes(searchText.toLowerCase()) ||
        (q.subCapability || "").toLowerCase().includes(searchText.toLowerCase());
      const matchesCapability = filterCapability ? q.capability === filterCapability : true;
      return matchesSearch && matchesCapability;
    });
  }, [questions, searchText, filterCapability]);

  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredQuestions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  // --- Event Handlers ---
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure? This will permanently delete the question.")) {
      const token = localStorage.getItem("token");
      const promise = fetch(`/api/questions/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
        .then(res => { if (!res.ok) throw new Error('Deletion failed.') });

      toast.promise(promise, {
        loading: 'Deleting...',
        success: () => {
          setQuestions(prev => prev.filter(q => q.id !== id));
          return 'Question deleted!';
        },
        error: (err) => err.toString(),
      });
    }
  };

  const handleEdit = (questionId: number) => {
    // This is where you would navigate to an edit page or open an edit modal
    toast.error('Edit functionality not yet implemented.');
    // Example navigation: router.push(`/Admin/questions/edit/${questionId}`);
  };

  // --- Render Logic ---
  if (loading) {
    return <div className="page-container"><h1>Loading Question Bank...</h1></div>;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Question Bank</h1>
        <Link href="/Admin/questions/questionsForm">
          <button className="btn btn-primary">+ Add New Questions</button>
        </Link>
      </header>

      <div className="controls-container">
        <input
          type="text"
          placeholder="Search by question text or sub-capability..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="form-input"
        />
        <select
          value={filterCapability}
          onChange={(e) => setFilterCapability(e.target.value)}
          className="form-input"
        >
          <option value="">All Capabilities</option>
          {capabilities.map((cap) => (
            <option key={cap.id} value={cap.name}>
              {cap.name}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="question-bank-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question Text</th>
                <th>Capability</th>
                <th>Marks</th>
                <th>Correct Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedQuestions.length > 0 ? (
                paginatedQuestions.map((q) => (
                  <tr key={q.id}>
                    <td>{q.id}</td>
                    <td className="question-text-cell">{q.text}</td>
                    <td className="capability-cell">
                      <span>{q.subCapability || q.capability}</span>
                    </td>
                    <td>{q.marks}</td>
                    <td className="correct-answer-cell">{q.correctAnswer}</td>
                    <td className="actions-cell">
                      <button className="btn-icon edit" onClick={() => handleEdit(q.id)} title="Edit Question">
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(q.id)} title="Delete Question">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-results-cell">
                    No questions found. Try adjusting your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing <strong>{Math.min(1 + (currentPage - 1) * itemsPerPage, filteredQuestions.length)}</strong> to <strong>{Math.min(currentPage * itemsPerPage, filteredQuestions.length)}</strong> of <strong>{filteredQuestions.length}</strong>
          </div>
          <div className="pagination-controls">
            <button
              className="btn pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="btn pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}