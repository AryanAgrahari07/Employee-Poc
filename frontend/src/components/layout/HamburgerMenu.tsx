import React, { useState } from "react";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";

export default function HamburgerMenu() {
  const { state, toggle } = useToggle(false);
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

  return (
    <div className="sm:hidden relative">
      <button 
        onClick={toggle} 
        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-0.5 bg-slate-800 mb-1.5 transition-all" style={{ transform: state ? 'rotate(45deg) translateY(6px)' : 'none' }} />
        <div className="w-6 h-0.5 bg-slate-800 mb-1.5 transition-all" style={{ opacity: state ? 0 : 1 }} />
        <div className="w-6 h-0.5 bg-slate-800 transition-all" style={{ transform: state ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
      </button>

      {state && (
        <div className="absolute left-0 top-12 bg-white shadow-xl rounded-lg p-4 w-64 z-50 border border-gray-200">
          <nav className="space-y-1">
            <Link 
              to="/employees" 
              onClick={toggle}
              className="block px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 font-medium transition-colors"
            >
              Employees
            </Link>
            
            <div>
              <button
                onClick={() => toggleSubmenu("reports")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 font-medium transition-colors"
              >
                <span>Reports</span>
                <span className={`transform transition-transform ${expandedItems.has("reports") ? "rotate-90" : ""}`}>
                  ▶
                </span>
              </button>
              {expandedItems.has("reports") && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-3">
                  <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-sm text-gray-600">Monthly Report</a>
                  <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-sm text-gray-600">Attendance Report</a>
                  <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-sm text-gray-600">Performance Report</a>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleSubmenu("settings")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 font-medium transition-colors"
              >
                <span>Settings</span>
                <span className={`transform transition-transform ${expandedItems.has("settings") ? "rotate-90" : ""}`}>
                  ▶
                </span>
              </button>
              {expandedItems.has("settings") && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-3">
                  <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-sm text-gray-600">Profile</a>
                  <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-blue-50 text-sm text-gray-600">Preferences</a>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
