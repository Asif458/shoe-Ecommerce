import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Get user from context or localStorage (fallback)
  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  // 🔒 Not logged in
  if (!currentUser || !currentUser.id) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 🔒 Blocked user
  if (currentUser.isBlock === true) {
    return <Navigate to="/blocked" replace />;
  }

  // 🔒 Role mismatch
  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ All checks passed
  return children;
}
