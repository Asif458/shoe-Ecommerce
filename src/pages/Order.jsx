import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ArrowLeft,
  IndianRupee,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast"; // ✅ Import toast

export default function Order() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.id) {
      fetchOrders();
    } else {
      toast.error("You must be logged in to view your orders.");
    }
    // eslint-disable-next-line
  }, [user?.id]);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const fetchedOrders = res.data.orders || [];
      setOrders(fetchedOrders);

      if (fetchedOrders.length === 0) {
        toast("You haven't placed any orders yet.");
      }
    } catch (err) {
      console.error("Error loading orders:", err);
      toast.error("Failed to load your orders.");
    }
  };

  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return { color: "text-green-600", icon: <CheckCircle size={16} /> };
      case "shipped":
      case "out for delivery":
        return { color: "text-blue-600", icon: <Truck size={16} /> };
      case "processing":
      case "pending":
        return { color: "text-yellow-600", icon: <Clock size={16} /> };
      case "cancelled":
        return { color: "text-red-600", icon: <Trash2 size={16} /> };
      default:
        return { color: "text-gray-600", icon: <Package size={16} /> };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10 text-center w-full flex items-center justify-center gap-4">
        <Package size={48} className="text-blue-600" />
        Your Orders
      </h1>

      {/* Empty Orders UI */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center animate-fade-in">
          <Package size={64} className="text-gray-400 mb-6" />
          <p className="text-xl text-gray-600 font-medium mb-6">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-7 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl w-full">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div
                key={order.id}
                className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-100 transform transition-all duration-300 hover:scale-[1.005] hover:shadow-xl animate-fade-in-up"
              >
                {/* Header */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Package size={20} className="text-blue-500" />
                    Order <span className="text-blue-600">#{order.id}</span>
                  </h2>
                  <span className="text-sm font-medium text-gray-500">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 pt-2 pb-4 border-b border-dashed border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Shipping Details:</p>
                    <p><span className="font-medium">Name:</span> {order.shippingInfo.name}</p>
                    <p><span className="font-medium">Address:</span> {order.shippingInfo.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1 invisible md:visible"></p>
                    <p><span className="font-medium">Phone:</span> {order.shippingInfo.phone}</p>
                    {/* <p><span className="font-medium">Pincode:</span> {order.shippingInfo.pincode || "N/A"}</p> */}
                  </div>
                </div>

                {/* Items */}
                <div className="pt-2">
                  <p className="font-bold text-lg text-gray-800 mb-3">Items Ordered:</p>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-inner border border-gray-100"
                      >
                        <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden border border-gray-200">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-semibold text-base">{item.name}</p>
                          <p className="text-gray-500 text-sm">
                            Qty: <span className="font-medium">{item.quantity}</span> | Price: ₹
                            <span className="font-medium">{item.price}</span>
                          </p>
                        </div>
                        <p className="text-gray-900 font-bold text-md flex items-center">
                          <IndianRupee size={14} />{(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total & Status */}
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <p className="font-bold text-xl text-gray-900 flex items-center gap-1">
                    <IndianRupee size={18} />
                    Total: <span className="text-orange-600">{order.total.toFixed(2)}</span>
                  </p>
                  <div
                    className={`text-md font-bold flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.color} bg-opacity-10`}
                    style={{
                      backgroundColor: `${statusInfo.color.replace("text-", "")}1A`,
                    }}
                  >
                    {statusInfo.icon}
                    <span>{order.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
