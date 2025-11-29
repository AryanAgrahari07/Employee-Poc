import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarMenu() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  function toggleSubmenu(item: string) {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden md:block w-64 p-4 border-r bg-white">
      <div className="text-sm space-y-1">
        <div className="font-bold text-lg mb-4 text-gray-800">Menu</div>
        
        <Link
          to="/employees"
          className={`block px-3 py-2 rounded-md transition-colors ${
            isActive("/employees")
              ? "bg-blue-100 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Employees
        </Link>

        <div>
          <button
            onClick={() => toggleSubmenu("reports")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
              expandedItems.has("reports")
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Reports</span>
            <span className={`transform transition-transform text-xs ${expandedItems.has("reports") ? "rotate-90" : ""}`}>
              ▶
            </span>
          </button>
          {expandedItems.has("reports") && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-3">
              <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-gray-600">Monthly Report</a>
              <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-gray-600">Attendance Report</a>
              <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-gray-600">Performance Report</a>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSubmenu("settings")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
              expandedItems.has("settings")
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Settings</span>
            <span className={`transform transition-transform text-xs ${expandedItems.has("settings") ? "rotate-90" : ""}`}>
              ▶
            </span>
          </button>
          {expandedItems.has("settings") && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-3">
              <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-gray-600">Profile</a>
              <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-gray-600">Preferences</a>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
