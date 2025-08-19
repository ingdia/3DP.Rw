// app/components/admin/AdminShell.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";


interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <div className="admin-shell">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        active={active}
        setActive={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="main">
        <div className="admin-content-area">{children}</div>
      </div>
    </div>
  );
}
