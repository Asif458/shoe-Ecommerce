import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast"; 

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, search, sortOrder]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/users");
      const allUsers = res.data;

      const allOrders = [];

      allUsers.forEach((user) => {
        (user.orders || []).forEach((order) => {
          allOrders.push({
            ...order,
            userId: user.id,
            customerName: user.name,
          });
        });
      });

      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders"); 
    }
  };

  const handleStatusChange = async (userId, orderId, newStatus) => {
    try {
      const res = await api.get(`/users/${userId}`);
      const user = res.data;

      const updatedOrders = (user.orders || []).map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      await api.patch(`/users/${userId}`, {
        orders: updatedOrders,
      });

      toast.success("Order status updated");  
      fetchOrders(); // Refresh
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");  
    }
  };

  const applyFilters = () => {
    let temp = [...orders];

    // Search
    if (search.trim()) {
      temp = temp.filter(
        (order) =>
          order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
          order.id.toString().includes(search)
      );
    }

    // Sort
    if (sortOrder === "newest") {
      temp.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === "oldest") {
      temp.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFiltered(temp);
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      {/*  Filter & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or order ID"
          className="border p-2 rounded w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full sm:w-1/4"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Date</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/*  Orders Table */}
      {filtered.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left px-6 py-3">Order ID</th>
                <th className="text-left px-6 py-3">Customer</th>
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Total</th>
                <th className="text-left px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">#{order.id}</td>
                  <td className="px-6 py-3">{order.customerName}</td>
                  <td className="px-6 py-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">₹{order.total}</td>
                  <td className="px-6 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.userId, order.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
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
