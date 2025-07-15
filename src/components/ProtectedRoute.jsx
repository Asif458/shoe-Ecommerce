
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  const stored = JSON.parse(localStorage.getItem("user"));

  const currentUser = user || stored;

  if (!currentUser || !currentUser.id) {
    //  Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    //  Role doesn't match
    return <Navigate to="/" replace />;
  }

  //  Authenticated and role matched (or no role required)
  return children;
}
