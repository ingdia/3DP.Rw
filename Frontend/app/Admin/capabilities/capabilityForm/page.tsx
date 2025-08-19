"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import './capabilityForm.css'

interface SubCapability {
  name: string;
  weighting: number;
}

interface CapabilityFormProps {
  onSubmit: (data: { name: string; weighting: number; subCapabilities: SubCapability[] }) => void;
}

export default function CapabilityForm({ onSubmit }: CapabilityFormProps) {
  const router = useRouter();

  const [capabilityName, setCapabilityName] = useState("");
  const [capabilityWeight, setCapabilityWeight] = useState(0);
  const [subCapabilities, setSubCapabilities] = useState<SubCapability[]>([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // Live progress calculation
  useEffect(() => {
    const totalSub = subCapabilities.reduce((sum, sub) => sum + sub.weighting, 0);
    setProgress(capabilityWeight > 0 ? Math.min((totalSub / capabilityWeight) * 100, 100) : 0);
  }, [subCapabilities, capabilityWeight]);

  const addSubCapability = () => setSubCapabilities([...subCapabilities, { name: "", weighting: 0 }]);
  const updateSubCapability = (index: number, key: keyof SubCapability, value: string | number) => {
    const updated = [...subCapabilities];
    if (key === "weighting") updated[index].weighting = Number(value);
    else updated[index].name = String(value);
    setSubCapabilities(updated);
  };
  const removeSubCapability = (index: number) => setSubCapabilities(subCapabilities.filter((_, i) => i !== index));

  const validateForm = (): string | null => {
    if (!capabilityName.trim()) return "Capability name is required.";
    if (capabilityWeight <= 0) return "Capability weighting must be greater than 0.";
    for (const sub of subCapabilities) {
      if (!sub.name.trim()) return "All sub-capabilities must have a name.";
      if (sub.weighting <= 0) return "All sub-capabilities must have weighting greater than 0.";
    }
    const totalSubWeight = subCapabilities.reduce((sum, sub) => sum + sub.weighting, 0);
    if (totalSubWeight > capabilityWeight) return `Total sub-capabilities weighting (${totalSubWeight}%) cannot exceed capability weighting (${capabilityWeight}%).`;
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    onSubmit({ name: capabilityName, weighting: capabilityWeight, subCapabilities });

    // Reset and navigate back
    setCapabilityName("");
    setCapabilityWeight(0);
    setSubCapabilities([]);
    router.push("/Admin/capabilities");
  };

  const handleCancel = () => setCancelModalOpen(true);
  const confirmCancel = () => {
    setCancelModalOpen(false);
    router.push("/Admin/capabilities");
  };
  const closeCancelModal = () => setCancelModalOpen(false);

  return (
    <div className="page-wrapper">
      {/* Back button */}
      <div className="page-topbar">
        <button
          className="back-icon-btn"
          aria-label="Back to Capabilities"
          onClick={() => router.push("/Admin/capabilities")}
        >
          ← Back
        </button>
      </div>

      <div className="form-card">
        <div className="form-header-inline">
          <h1>Add Capability</h1>
        </div>

        {/* Display validation errors */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="capability-form">
          <div className="field">
            <label>Capability Name</label>
            <input
              type="text"
              placeholder="Enter capability name"
              value={capabilityName}
              onChange={(e) => setCapabilityName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Weighting (%)</label>
            <input
              type="number"
              placeholder="Enter weighting"
              value={capabilityWeight}
              onChange={(e) => setCapabilityWeight(Number(e.target.value))}
              required
            />
          </div>

          <div className="sub-capabilities">
            <h2>Sub-Capabilities</h2>
            {subCapabilities.map((sub, index) => (
              <div key={index} className="sub-capability-item">
                <input
                  type="text"
                  placeholder="Name"
                  value={sub.name}
                  onChange={(e) => updateSubCapability(index, "name", e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Weighting"
                  value={sub.weighting}
                  onChange={(e) => updateSubCapability(index, "weighting", Number(e.target.value))}
                  required
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeSubCapability(index)}
                  title="Remove this sub-capability"
                >
                  ✕
                </button>
              </div>
            ))}

            <button type="button" className="add-sub-btn" onClick={addSubCapability}>
              + Add Sub-Capability
            </button>

            <div className="progress-bar-container" aria-hidden>
              <div
                className={`progress-bar ${progress >= 100 ? "over" : ""}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="progress-text">
              {subCapabilities.reduce((sum, sub) => sum + sub.weighting, 0)} / {capabilityWeight} %
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Save Capability</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>

      {/* Cancel modal overlay */}
      {cancelModalOpen && (
        <div className="confirm-modal-overlay" onClick={closeCancelModal} role="dialog" aria-modal="true">
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to cancel?</h3>
            <p>All unsaved changes will be lost.</p>
            <div className="confirm-actions">
              <button className="confirm-btn" onClick={confirmCancel}>Yes, Cancel</button>
              <button className="close-btn" onClick={closeCancelModal}>No, Go Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
