import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast"; // ✅ Use hot-toast

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, search]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
      toast.error("Failed to load users ");
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <span className="flex flex-col">
          <p className="font-semibold mb-2">Are you sure you want to delete this user?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/users/${id}`);
                  setUsers((prev) => prev.filter((u) => u.id !== id));
                  toast.success("User deleted successfully ");
                } catch (err) {
                  console.error("Delete failed:", err);
                  toast.error("Failed to delete user");
                }
              }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      {
        duration: 10000,
      }
    );
  };

  const applyFilters = () => {
    let temp = [...users];
    if (search.trim()) {
      temp = temp.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(temp);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {/*  Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border p-2 rounded w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User Table */}
      {filtered.length === 0 ? (
        <>
          <p>No users found.</p>
          {search.trim() && toast.error("No users matched your search")}
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-700">{user.id}</td>
                  <td className="px-6 py-3 font-medium">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
