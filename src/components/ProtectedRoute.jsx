import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // Get user from context or fallback to localStorage
  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  // If user is not logged in
  if (!currentUser || !currentUser.id) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required and doesn't match
  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Authenticated and role matched
  return children;
}
