import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "./Navbar";
import HamburgerMenu from "./HamburgerMenu";
import SidebarMenu from "./SidebarMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  // Don't show layout on login page
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        <SidebarMenu />
        <main className="flex-1 min-w-0">
          <div className="sm:hidden mb-4">
            <HamburgerMenu />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
