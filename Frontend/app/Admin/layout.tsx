"use client";

import AdminShell from "@/app/components/admin/AdminShell";
import "@/app/styles/admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
