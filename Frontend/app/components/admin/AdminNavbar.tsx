"use client";

import React from "react";
import { Menu } from "lucide-react";
import "./sidebar.css";

interface AdminNavbarProps {
  onMenuClick: () => void;
  username?: string; // optional username
}

export default function AdminNavbar({
  onMenuClick,
  username = "Admin",
}: AdminNavbarProps) {
  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        {/* Hamburger / Menu Button */}
        <button
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu className="icon" />
        </button>

        {/* Title */}
        <span className="navbar-title">3DP Admin Dashboard</span>
      </div>

      <div className="navbar-right">
        {/* User greeting */}
        <span className="navbar-user">Welcome, {username}</span>

        {/* Optional future icons/buttons */}
        {/* <button className="icon-btn">...</button> */}
      </div>
    </header>
  );
}
