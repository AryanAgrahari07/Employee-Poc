import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/employees" className="font-bold text-2xl text-blue-600 hover:text-blue-700 transition-colors">
            Employee POC
          </Link>
          <nav className="hidden sm:flex gap-1">
            <Link 
              to="/employees" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Employees
            </Link>
            <a 
              href="#" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Reports
            </a>
            <a 
              href="#" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Settings
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-700">{user.username}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  user.role === "ADMIN" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-green-100 text-green-700"
                }`}>
                  {user.role}
                </span>
              </div>
              <button 
                onClick={logout} 
                className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
