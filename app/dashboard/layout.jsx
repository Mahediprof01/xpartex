"use client";

import { useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar: Fixed position, full height */}
        <aside
          className={`hidden md:flex flex-col fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border z-40 ${
            collapsed ? "w-20" : "w-72"
          }`}
        >
          <DashboardSidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
        </aside>

        {/* Header: Fixed position, offset by sidebar width */}
        <header 
          className={`fixed top-0 right-0 h-20 bg-white border-b border-border shadow-sm z-30 transition-all duration-300 ease-in-out ${
            collapsed ? "left-0 md:left-20" : "left-0 md:left-72"
          }`}
        >
          <DashboardHeader collapsed={collapsed} />
        </header>

        {/* Main content: Offset by sidebar width and header height */}
        <main 
          className={`pt-20 min-h-screen bg-background transition-all duration-300 ease-in-out ${
            collapsed ? "ml-0 md:ml-20" : "ml-0 md:ml-72"
          }`}
        >
          <div className="p-6 h-full overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
