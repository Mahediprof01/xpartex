import AuthGuard from "../../components/AuthGuard";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <DashboardHeader />
        {/* Main content area with sidebar */}
        <div className="flex flex-1 h-[calc(100vh-4rem)]">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-72 bg-sidebar border-r border-sidebar-border sticky top-16 h-[calc(100vh-4rem)]">
            <DashboardSidebar />
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
