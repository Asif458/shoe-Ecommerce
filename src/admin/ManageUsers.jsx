import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const toggleBlock = async (userId, currentStatus) => {
    try {
      await api.patch(`/users/${userId}`, { isBlock: !currentStatus });
      toast.success(`User has been ${!currentStatus ? "blocked" : "unblocked"}`);
      fetchUsers(); // Refresh user list
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Error updating block status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">Role: {user.role}</p>
              <p className="text-sm">
                Status:{" "}
                <span className={user.isBlock ? "text-red-500" : "text-green-500"}>
                  {user.isBlock ? "Blocked" : "Active"}
                </span>
              </p>
            </div>

            <button
              onClick={() => toggleBlock(user.id, user.isBlock)}
              className={`px-4 py-2 rounded text-white ${
                user.isBlock ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {user.isBlock ? "Unblock" : "Block"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
