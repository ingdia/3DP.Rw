"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'; // Used for better user feedback

// Your existing CSS file
import './capabilityForm.css';

// Interface for a sub-capability object
interface SubCapability {
  name: string;
  weighting: number;
}

// --- MAIN PAGE COMPONENT ---
// REFINED: Removed the props, as this is a page component.
export default function CapabilityFormPage() {
  const router = useRouter();

  // --- State Management ---
  const [capabilityName, setCapabilityName] = useState("");
  const [capabilityWeight, setCapabilityWeight] = useState(0);
  const [subCapabilities, setSubCapabilities] = useState<SubCapability[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state on the button
  const [progress, setProgress] = useState(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // --- Effects ---
  // Live progress calculation for the weighting bar
  useEffect(() => {
    const totalSubWeight = subCapabilities.reduce((sum, sub) => sum + (Number(sub.weighting) || 0), 0);
    const weight = Number(capabilityWeight) || 0;
    setProgress(weight > 0 ? Math.min((totalSubWeight / weight) * 100, 100) : 0);
  }, [subCapabilities, capabilityWeight]);


  // --- Helper Functions ---
  const addSubCapability = () => setSubCapabilities([...subCapabilities, { name: "", weighting: 0 }]);
  
  const updateSubCapability = (index: number, key: keyof SubCapability, value: string | number) => {
    const updated = [...subCapabilities];
    if (key === "weighting") updated[index].weighting = Number(value) || 0;
    else updated[index].name = String(value);
    setSubCapabilities(updated);
  };
  
  const removeSubCapability = (index: number) => setSubCapabilities(subCapabilities.filter((_, i) => i !== index));

  // --- Validation ---
  const validateForm = (): string | null => {
    if (!capabilityName.trim()) return "Capability name is required.";
    if (Number(capabilityWeight) <= 0) return "Capability weighting must be greater than 0.";
    for (const sub of subCapabilities) {
      if (!sub.name.trim()) return "All sub-capabilities must have a name.";
      if (Number(sub.weighting) <= 0) return "All sub-capability weightings must be greater than 0.";
    }
    const totalSubWeight = subCapabilities.reduce((sum, sub) => sum + (Number(sub.weighting) || 0), 0);
    if (totalSubWeight > Number(capabilityWeight)) {
        return `Total sub-capability weighting (${totalSubWeight}%) cannot exceed the capability weighting (${capabilityWeight}%).`;
    }
    return null;
  };

// Refined handleSubmit function for capabilityForm.tsx

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setIsSubmitting(true);

    const capabilityData = {
      name: capabilityName,
      weighting: Number(capabilityWeight),
      subCapabilities,
    };

    const token = localStorage.getItem('token');
    if (!token) {
        toast.error("You are not authorized. Please log in again.");
        setIsSubmitting(false);
        return router.push('/login');
    }

    try {
        const response = await fetch('/api/capabilities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(capabilityData)
        });

        // --- ROBUST ERROR HANDLING BLOCK ---
        // Check if the response is not JSON before trying to parse it
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
            let errorMessage = `Request failed with status ${response.status}`;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                // If it IS JSON, we can parse the error message from the backend
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } else {
                // If it's NOT JSON (e.g., HTML error), get the raw text
                errorMessage = await response.text();
            }
            throw new Error(errorMessage);
        }
        // --- END OF BLOCK ---

        // If we reach here, the response was successful
        toast.success('Capability saved successfully!');
        router.push("/Admin/capabilities");

    } catch (err: any) {
        // Display the detailed error message we constructed
        toast.error(err.message);
        console.error("Submission Error:", err);
    } finally {
        setIsSubmitting(false);
    }
};

  // --- Cancel Modal Handlers ---
  const handleCancel = () => setIsCancelModalOpen(true);
  const confirmCancel = () => {
    setIsCancelModalOpen(false);
    router.push("/Admin/capabilities");
  };
  const closeCancelModal = () => setIsCancelModalOpen(false);

  // --- JSX ---
  return (
    <div className="page-wrapper">
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

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="capability-form">
          <div className="field">
            <label>Capability Name</label>
            <input
              type="text"
              placeholder="e.g., Data Governance"
              value={capabilityName}
              onChange={(e) => setCapabilityName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Weighting (%)</label>
            <input
              type="number"
              placeholder="e.g., 40"
              value={capabilityWeight}
              onChange={(e) => setCapabilityWeight(Number(e.target.value))}
              min="1"
              required
            />
          </div>

          <div className="sub-capabilities">
            <h2>Sub-Capabilities (Optional)</h2>
            {subCapabilities.map((sub, index) => (
              <div key={index} className="sub-capability-item">
                <input
                  type="text"
                  placeholder="Sub-capability name"
                  value={sub.name}
                  onChange={(e) => updateSubCapability(index, "name", e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Weighting"
                  value={sub.weighting}
                  onChange={(e) => updateSubCapability(index, "weighting", e.target.value)}
                  min="1"
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
              {subCapabilities.reduce((sum, sub) => sum + (Number(sub.weighting) || 0), 0)}% of {capabilityWeight}% used
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Capability'}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      {isCancelModalOpen && (
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