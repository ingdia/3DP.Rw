"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PlusCircle, Search, SlidersHorizontal, Trash2, Edit, X } from "lucide-react";
import "./capabilities.css";

// --- Interfaces ---
interface SubCapability {
  id?: number; // Optional, as new ones won't have it
  name: string;
  weighting: number;
}

interface Capability {
  id: number;
  name: string;
  weighting: number;
  subCapabilities: SubCapability[];
}

// --- Main Page Component ---
export default function CapabilitiesPage() {
  const router = useRouter();

  // --- State Management ---
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCap, setEditingCap] = useState<Capability | null>(null);
  const [capName, setCapName] = useState("");
  const [capWeight, setCapWeight] = useState(0);
  const [subCaps, setSubCaps] = useState<SubCapability[]>([]);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchCapabilities = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authorization failed. Please log in.");
        return router.push("/login");
      }

      try {
        setLoading(true);
        const res = await fetch("/api/capabilities", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch capabilities. Please try again.");
        }
        const data = await res.json();
        setCapabilities(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCapabilities();
  }, [router]);

  // --- Filtering Logic ---
  const filteredCapabilities = useMemo(() => {
    return capabilities.filter((cap) => {
      const matchesSearch =
        cap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.subCapabilities.some((sub) =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      let matchesFilter = true;
      if (filter === "low") matchesFilter = cap.weighting < 30;
      if (filter === "medium") matchesFilter = cap.weighting >= 30 && cap.weighting <= 60;
      if (filter === "high") matchesFilter = cap.weighting > 60;

      return matchesSearch && matchesFilter;
    });
  }, [capabilities, searchQuery, filter]);


  // --- Modal & Edit Handlers ---
  const openEditModal = (cap: Capability) => {
    setEditingCap(cap);
    setCapName(cap.name);
    setCapWeight(cap.weighting);
    setSubCaps(cap.subCapabilities.map((sub) => ({ ...sub }))); // Deep copy
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingCap) return;

    const updatedData = { name: capName, weighting: capWeight, subCapabilities: subCaps };
    const token = localStorage.getItem("token");

    const promise = fetch(`/api/capabilities/${editingCap.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update.");
      return data;
    });

    toast.promise(promise, {
      loading: "Saving changes...",
      success: () => {
        // Update the state locally for an instant UI update
        setCapabilities(
          capabilities.map((c) => (c.id === editingCap.id ? { ...editingCap, ...updatedData } : c))
        );
        setIsModalOpen(false);
        return "Capability updated!";
      },
      error: (err) => err.toString(),
    });
  };

  const addSubCapability = () => setSubCaps([...subCaps, { name: "", weighting: 0 }]);
  const updateSubCapability = (index: number, key: keyof SubCapability, value: string | number) => {
    const updated = [...subCaps];
    if (key === "name") updated[index].name = String(value);
    else updated[index].weighting = Number(value);
    setSubCaps(updated);
  };
  const removeSubCapability = (index: number) => setSubCaps(subCaps.filter((_, i) => i !== index));

  // --- Delete Handler ---
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure? This will permanently delete the capability and its sub-capabilities.")) {
      const token = localStorage.getItem("token");
      const promise = fetch(`/api/capabilities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (!res.ok) throw new Error("Deletion failed.");
      });

      toast.promise(promise, {
        loading: "Deleting...",
        success: () => {
          setCapabilities((prev) => prev.filter((cap) => cap.id !== id));
          return "Capability deleted!";
        },
        error: (err) => err.toString(),
      });
    }
  };

  // --- Render Logic ---
  if (loading) {
    return <div className="loading-state">Loading Capabilities...</div>;
  }

  return (
    <div className="capabilities-page">
      <div className="page-header">
        <h1>Capabilities Management</h1>
        <button className="add-cap-btn" onClick={() => router.push("/Admin/capabilities/capabilityForm")}>
          <PlusCircle size={20} />
          <span>Add Capability</span>
        </button>
      </div>

      <div className="filters">
        <div className="search-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search capabilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-box"
          />
        </div>
        <div className="filter-wrapper">
          <SlidersHorizontal size={20} className="filter-icon" />
          <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Weightings</option>
            <option value="low">Low Weight (&lt; 30%)</option>
            <option value="medium">Medium Weight (30-60%)</option>
            <option value="high">High Weight (&gt; 60%)</option>
          </select>
        </div>
      </div>

      <div className="capabilities-list">
        {filteredCapabilities.length > 0 ? (
          filteredCapabilities.map((cap) => (
            <div key={cap.id} className="capability-card">
              <div className="card-header">
                <h2>{cap.name}</h2>
                <p className="weighting">Weighting: {cap.weighting}%</p>
              </div>
              <div className="sub-capabilities">
                {cap.subCapabilities.length > 0 ? (
                  cap.subCapabilities.map((sub, idx) => (
                    <div key={sub.id || idx} className="sub-cap">
                      <span>{sub.name}</span>
                      <span className="sub-weight">{sub.weighting}%</span>
                    </div>
                  ))
                ) : (
                  <p className="no-subcaps">No sub-capabilities defined.</p>
                )}
              </div>
              <div className="cap-actions">
                <button className="edit-btn" onClick={() => openEditModal(cap)}><Edit size={16}/> Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(cap.id)}><Trash2 size={16}/> Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No Capabilities Found</h3>
            <p>Try adjusting your search or filter, or add a new capability.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Capability</h2>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}><X size={24}/></button>
            </div>
            <div className="modal-body">
              <input type="text" placeholder="Capability Name" value={capName} onChange={(e) => setCapName(e.target.value)} />
              <input type="number" placeholder="Capability Weighting" value={capWeight} onChange={(e) => setCapWeight(Number(e.target.value))} />
              <div className="subcap-form">
                <h3>Sub-Capabilities</h3>
                {subCaps.map((sub, idx) => (
                  <div key={sub.id || idx} className="subcap-row">
                    <input type="text" placeholder="Name" value={sub.name} onChange={(e) => updateSubCapability(idx, "name", e.target.value)} />
                    <input type="number" placeholder="Weighting" value={sub.weighting} onChange={(e) => updateSubCapability(idx, "weighting", e.target.value)} />
                    <button className="remove-sub-btn" onClick={() => removeSubCapability(idx)}><Trash2 size={16}/></button>
                  </div>
                ))}
                <button className="add-sub-btn" onClick={addSubCapability}><PlusCircle size={16}/> Add Sub-Capability</button>
              </div>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}