import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, usersRes] = await Promise.all([
        api.get("/products"),
        api.get("/users"),
      ]);

      const products = productsRes.data;
      const users = usersRes.data;

      setProductsCount(products.length);
      setUsersCount(users.length);

      let totalOrders = 0;
      let totalSalesAmount = 0;
      const salesSummary = [];

      users.forEach((user) => {
        const userOrders = user.orders || [];
        let userTotal = 0;

        userOrders.forEach((order) => {
          totalOrders++;
          userTotal += order.total || 0;
          totalSalesAmount += order.total || 0;
        });

        if (userTotal > 0) {
          salesSummary.push({
            name: user.name || "User",
            sales: userTotal,
          });
        }
      });

      setOrdersCount(totalOrders);
      setTotalSales(totalSalesAmount);
      setSalesData(salesSummary);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
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
        <div className="bg-white rounded-lg shadow p-6 text-center border-l-4 border-yellow-500">
          <p className="text-lg font-semibold">Total Sales</p>
          <p className="text-3xl font-bold text-yellow-600">₹{totalSales}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Sales per User
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Sales Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesData}
                dataKey="sales"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {salesData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
