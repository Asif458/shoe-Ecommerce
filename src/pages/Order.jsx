import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded p-4 space-y-3 border"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Name:</strong> {order.shippingInfo.name}</p>
                <p><strong>Address:</strong> {order.shippingInfo.address}</p>
                <p><strong>Phone:</strong> {order.shippingInfo.phone}</p>
              </div>

              <div className="border-t pt-3">
                <p className="font-semibold mb-2">Items:</p>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <p className="font-bold">Total: ₹{order.total}</p>
                <p className="text-sm text-blue-600 font-semibold">
                  Status: {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
