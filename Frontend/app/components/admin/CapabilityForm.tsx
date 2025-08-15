"use client";

import { useState } from 'react';

interface CapabilityFormProps {
  onSubmit: (data: { name: string; weighting: number }) => void;
}

const CapabilityForm = ({ onSubmit }: CapabilityFormProps) => {
  const [name, setName] = useState('');
  const [weighting, setWeighting] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !weighting) return;

    onSubmit({ name, weighting: parseInt(weighting) });
    
    // Reset form
    setName('');
    setWeighting('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Add New Capability</h3>
      <div className="form-group">
        <label htmlFor="name">Capability Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Data Security"
        />
      </div>
      <div className="form-group">
        <label htmlFor="weighting">Weighting (%)</label>
        <input
          type="number"
          id="weighting"
          value={weighting}
          onChange={(e) => setWeighting(e.target.value)}
          placeholder="e.g., 20"
        />
      </div>
      <button type="submit" className="btn-submit">Add Capability</button>
    </form>
  );
};

export default CapabilityForm;