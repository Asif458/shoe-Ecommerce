import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const stored = JSON.parse(localStorage.getItem("user"));

  if (!stored || !stored.id) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && stored.role !== role) {
    // Role does not match
    return <Navigate to="/" replace />;
  }

  return children;
}
