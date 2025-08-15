"use client";

import { useState } from 'react';
import { dummyQuestions, dummyCapabilities, Question } from '../../../lib/dummy-data';
import '../../styles/admin.css';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>(dummyQuestions);

  // Form state
  const [questionText, setQuestionText] = useState('');
  const [selectedCap, setSelectedCap] = useState(dummyCapabilities[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText || !selectedCap) return;

    const capabilityName = dummyCapabilities.find(c => c.id === selectedCap)?.name || '';
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      text: questionText,
      capabilityId: selectedCap,
      capabilityName: capabilityName,
    };
    setQuestions([...questions, newQuestion]);

    // Reset form
    setQuestionText('');
    setSelectedCap(dummyCapabilities[0]?.id || '');
  };

  return (
    <div>
      <h1>Manage Questions</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <h3>Add New Question</h3>
        <div className="form-group">
          <label htmlFor="capability">Capability</label>
          <select id="capability" value={selectedCap} onChange={(e) => setSelectedCap(e.target.value)}>
            {dummyCapabilities.map(cap => (
              <option key={cap.id} value={cap.id}>{cap.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="questionText">Question Text</label>
          <textarea
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
          ></textarea>
        </div>
        <button type="submit" className="btn-submit">Add Question</button>
      </form>

      <h2>Existing Questions</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Capability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.text}</td>
              <td>{q.capabilityName}</td>
              <td>
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsPage;