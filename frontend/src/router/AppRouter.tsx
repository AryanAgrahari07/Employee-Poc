import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import EmployeesPage from "../pages/EmployeesPage";
import NotFound from "../pages/NotFound";
import { useAuth } from "../hooks/useAuth";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/employees"
        element={user ? <EmployeesPage /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
