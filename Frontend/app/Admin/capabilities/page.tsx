"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import './capabilities.css'

interface SubCapability {
  name: string;
  weighting: number;
}

interface Capability {
  id: number;
  name: string;
  weighting: number;
  subCapabilities: SubCapability[];
}

export default function CapabilitiesPage() {
  const router = useRouter();

  const [capabilities, setCapabilities] = useState<Capability[]>([
    {
      id: 1,
      name: "Data Governance",
      weighting: 40,
      subCapabilities: [
        { name: "Data Quality", weighting: 20 },
        { name: "Metadata Management", weighting: 20 },
      ],
    },
    {
      id: 2,
      name: "Analytics Capability",
      weighting: 60,
      subCapabilities: [
        { name: "Reporting", weighting: 30 },
        { name: "Predictive Models", weighting: 30 },
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCap, setEditCap] = useState<Capability | null>(null);
  const [capName, setCapName] = useState("");
  const [capWeight, setCapWeight] = useState(0);
  const [subCaps, setSubCaps] = useState<SubCapability[]>([]);

  const openEditModal = (cap: Capability) => {
    setEditCap(cap);
    setCapName(cap.name);
    setCapWeight(cap.weighting);
    setSubCaps(cap.subCapabilities.map(sub => ({ ...sub })));
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!capName.trim() || capWeight <= 0) return;

    const totalSubWeight = subCaps.reduce((sum, sub) => sum + sub.weighting, 0);
    if (totalSubWeight > capWeight) {
      alert("Total sub-capabilities weighting cannot exceed capability weighting!");
      return;
    }

    if (editCap) {
      setCapabilities(capabilities.map(cap =>
        cap.id === editCap.id ? { ...editCap, name: capName, weighting: capWeight, subCapabilities: subCaps } : cap
      ));
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this capability?")) {
      setCapabilities(capabilities.filter(cap => cap.id !== id));
    }
  };

  const addSubCapability = () => setSubCaps([...subCaps, { name: "", weighting: 0 }]);

  const updateSubCapability = (index: number, key: "name" | "weighting", value: string | number) => {
    const updated = [...subCaps];
    if (key === "name") updated[index].name = value as string;
    else updated[index].weighting = value as number;
    setSubCaps(updated);
  };

  const removeSubCapability = (index: number) => {
    const updated = [...subCaps];
    updated.splice(index, 1);
    setSubCaps(updated);
  };

  return (
    <div className="capabilities-page">
      <div className="page-header">
        <h1>Capabilities</h1>
        <button
          className="add-cap-btn"
          onClick={() => router.push("/Admin/capabilities/capabilityForm")}
        >
          + Add Capability
        </button>
      </div>

      <div className="capabilities-list">
        {capabilities.map((cap) => (
          <div key={cap.id} className="capability-card">
            <h2>{cap.name}</h2>
            <p className="weighting">Weighting: {cap.weighting}%</p>
            <div className="sub-capabilities">
              {cap.subCapabilities.map((sub, idx) => (
                <div key={idx} className="sub-cap">
                  <span>{sub.name}</span>
                  <span>{sub.weighting}%</span>
                </div>
              ))}
            </div>
            <div className="cap-actions">
              <button className="edit-btn" onClick={() => openEditModal(cap)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(cap.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Capability</h2>
            <input
              type="text"
              placeholder="Capability Name"
              value={capName}
              onChange={(e) => setCapName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Capability Weighting"
              value={capWeight}
              onChange={(e) => setCapWeight(Number(e.target.value))}
            />
            <div className="subcap-form">
              <h3>Sub-Capabilities</h3>
              {subCaps.map((sub, idx) => (
                <div key={idx} className="subcap-row">
                  <input
                    type="text"
                    placeholder="Name"
                    value={sub.name}
                    onChange={(e) => updateSubCapability(idx, "name", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Weighting"
                    value={sub.weighting}
                    onChange={(e) => updateSubCapability(idx, "weighting", Number(e.target.value))}
                  />
                  <button className="remove-sub-btn" onClick={() => removeSubCapability(idx)}>Remove</button>
                </div>
              ))}
              <button className="add-sub-btn" onClick={addSubCapability}>+ Add Sub-Capability</button>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
