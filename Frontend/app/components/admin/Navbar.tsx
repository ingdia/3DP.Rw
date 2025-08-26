"use client";

import React from 'react';
import Image from 'next/image';
import { Bell, Menu } from 'lucide-react';
import './navbarAdmin.css'; // We will create this dedicated CSS file next

interface NavbarProps {
  // Function to toggle the sidebar on mobile
  onMenuButtonClick: () => void;
}

export default function Navbar({ onMenuButtonClick }: NavbarProps) {
  // DUMMY DATA: In a real app, you'd get this from a context or user state
  const adminUser = {
    name: "Admin User",
    avatarUrl: "/profile-pic.png", // Make sure to have a placeholder image in your /public folder
  };

  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        {/* Mobile Menu Button - only visible on small screens */}
        <button className="menu-btn" onClick={onMenuButtonClick}>
          <Menu size={24} />
        </button>
      </div>

      <div className="navbar-right">
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          {/* Optional: Add a dot for new notifications */}
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <Image
            src={adminUser.avatarUrl}
            alt="Admin Avatar"
            width={40}
            height={40}
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
}