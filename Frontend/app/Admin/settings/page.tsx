"use client";

import React, { useState } from 'react';
import { User, Shield, AppWindow, Save, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import './settings.css'; // We will create this dedicated CSS file next

// --- Types for different settings sections ---
type SettingsSection = 'profile' | 'security' | 'notifications' | 'application';

// --- Main Page Component ---
export default function SettingsPage() {
  // State to manage which settings section is currently active
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

  // --- Profile State (Dummy Data) ---
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [profileBio, setProfileBio] = useState("Administrator for the 3DP Data Maturity Platform.");

  // --- Security State ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // --- Form Handlers ---
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a PUT/PATCH API call to update the user's profile
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
    }
    // In a real app, this would be a POST API call to a `/api/users/change-password` endpoint
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // --- Helper to render the active section's content ---
  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <form onSubmit={handleProfileSave} className="settings-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="profileBio">Profile Bio</label>
              <textarea id="profileBio" value={profileBio} onChange={e => setProfileBio(e.target.value)} className="form-textarea" rows={3}></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        );
      case 'security':
        return (
          <form onSubmit={handlePasswordChange} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-input" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <Shield size={16} /> Update Password
              </button>
            </div>
          </form>
        );
      case 'notifications':
        return <p>Notification settings will be managed here.</p>;
      case 'application':
        return <p>General application settings (e.g., theme, language) will be managed here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="settings-page-container">
      <header className="page-header">
        <h1 className="page-title">Settings</h1>
      </header>

      <div className="settings-layout">
        {/* Left-hand Navigation Menu */}
        <nav className="settings-nav">
          <button 
            className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <User size={18} /> Profile
          </button>
          <button 
            className={`nav-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <Shield size={18} /> Security
          </button>
          <button 
            className={`nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            className={`nav-item ${activeSection === 'application' ? 'active' : ''}`}
            onClick={() => setActiveSection('application')}
          >
            <AppWindow size={18} /> Application
          </button>
        </nav>

        {/* Right-hand Content Area */}
        <main className="settings-content">
          <div className="content-card">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}