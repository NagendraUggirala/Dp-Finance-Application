import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Admin/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="h-screen flex overflow-hidden bg-[#F6F7FB]">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 min-h-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
