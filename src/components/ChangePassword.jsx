import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; //  

export default function ChangePassword() {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Fetchingg the current user API
      const res = await api.get(`/users/${user.id}`);
      const currentUser = res.data;

      //current pass check
      if (currentUser.password !== currentPassword) {
        toast.error("Current password is incorrect");
        return;
      }

      //update pass
      await api.patch(`/users/${user.id}`, { password: newPassword });
      toast.success("Password changed successfully");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error("Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
