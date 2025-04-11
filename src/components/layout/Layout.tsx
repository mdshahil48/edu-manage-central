
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function Layout() {
  const { isAuthenticated, user } = useAuth();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // If not authenticated, don't render the layout
  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-white shadow-md rounded-full"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            isMobile ? "fixed z-40" : "relative"
          } transition-transform duration-200 ease-in-out`}
        >
          <Sidebar closeSidebar={() => isMobile && setIsSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="container px-4 py-6 md:py-8 md:px-8">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster />
      <Sonner />
    </div>
  );
}
