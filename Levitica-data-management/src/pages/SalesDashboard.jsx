import React from "react";
import { Outlet } from "react-router-dom";
import SalesSidebar from "./Sales/SalesSidebar";

export default function SalesDashboard() {
  return (
    <div className="h-screen flex overflow-hidden bg-[#F6F7FB]">
      <SalesSidebar />
      <main className="flex-1 flex flex-col min-w-0 min-h-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
