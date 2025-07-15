import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        api.get("/products"),
        api.get("/orders"),
        api.get("/users"),
      ]);

      setProductsCount(productsRes.data.length);
      setOrdersCount(ordersRes.data.length);
      setUsersCount(usersRes.data.length);
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center border-l-4 border-blue-500">
          <p className="text-lg font-semibold">Total Products</p>
          <p className="text-3xl font-bold text-blue-600">{productsCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center border-l-4 border-green-500">
          <p className="text-lg font-semibold">Total Orders</p>
          <p className="text-3xl font-bold text-green-600">{ordersCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center border-l-4 border-purple-500">
          <p className="text-lg font-semibold">Total Users</p>
          <p className="text-3xl font-bold text-purple-600">{usersCount}</p>
        </div>
      </div>
    </div>
  );
}
