// components/AdminProtectedRoute.js
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in or not an admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If admin is blocked (optional: based on your use case)
  if (user.isBlock) {
    return <Navigate to="/blocked" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
