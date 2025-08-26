// app/components/admin/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FileText,
  Lightbulb,
  Building2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import "../admin/sidebar.css"; // Import the CSS for styling

const MENU = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard, href: "/Admin/overview" },
  { key: "capabilities", label: "Capabilities", icon: Wrench, href: "/Admin/capabilities" },
  { key: "questions", label: "Questions", icon: FileText, href: "/Admin/questions" },
  { key: "recommendations", label: "Recommendations", icon: Lightbulb, href: "/Admin/recommendations" },
  { key: "companies", label: "Companies & Assessments", icon: Building2, href: "/Admin/companies" },
  { key: "settings", label: "Settings", icon: Settings, href: "/Admin/settings" },
];

interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SidebarItemProps {
  item: MenuItem;
  active: string;
  collapsed: boolean;
  setActive: (key: string) => void;
  setMobileOpen: (open: boolean) => void;
}

function SidebarItem({ item, active, collapsed, setActive, setMobileOpen }: SidebarItemProps) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`sidebar-item ${active === item.key ? "active" : ""}`}
      onClick={() => {
        setActive(item.key);
        setMobileOpen(false);
      }}
    >
      <Icon className="icon" />
      {!collapsed && <span className="label">{item.label}</span>}
    </Link>
  );
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  active,
  setActive,
  setMobileOpen,
}: SidebarProps)
 
{
   const router = useRouter();

    const handleLogout = () => {
    // 1. Remove user data and token from browser storage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    // 2. Redirect to the login page
    router.push("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : "expanded"} relative`}>
      {/* Brand / Logo */}
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">3DP</div>
          {!collapsed && <span className="brand-name">Admin</span>}
        </div>
      </div>

      {/* Toggle button — always visible */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="collapse-btn absolute -right-3 top-4 bg-gray-700 text-white rounded-full p-1 z-50 shadow-md"
      >
        {collapsed ? (
          <ChevronRight className="icon" />
        ) : (
          <ChevronLeft className="icon" />
        )}
      </button>

      {/* Navigation */}
      <nav className="sidebar-menu">
        {MENU.map((m) => (
          <SidebarItem
            key={m.key}
            item={m}
            active={active}
            collapsed={collapsed}
            setActive={setActive}
            setMobileOpen={setMobileOpen}
          />
        ))}
      </nav>
      
       <div>
          <button
            onClick={handleLogout}
            className="sidebar-item w-full" // Use the same class for consistent styling
          >
            <LogOut className="icon" />
            {!collapsed && <span className="label">Log Out</span>}
          </button>
        </div>

      {/* Footer */}
      <div className="sidebar-footer">© {new Date().getFullYear()} 3DP</div>
    </aside>
  );
}
