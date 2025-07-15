import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { DollarSign, MapPin, Phone, User, CheckCircle } from "lucide-react"; // Importing icons

export default function Checkout() {
  const { cartItems, refreshCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await api.get(`/users/${user.id}`);
      const existingOrders = res.data.orders || [];

      const newOrder = {
        id: Date.now(),
        items: cartItems,
        total,
        shippingInfo,
        status: "Pending",
        date: new Date().toISOString(),
      };

      await api.patch(`/users/${user.id}`, {
        orders: [...existingOrders, newOrder],
        cart: [], // Clear cart after order
      });

      refreshCart(); // Refresh cart context
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
        <div className="p-6 sm:p-8 md:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center animate-slide-in-top">
            Complete Your Order
          </h1>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Shipping Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200 animate-fade-in-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MapPin className="text-blue-600" size={24} /> Shipping Details
              </h2>
              <div className="space-y-5">
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={shippingInfo.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                    aria-label="Full Name"
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                    aria-label="Delivery Address"
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                    aria-label="Phone Number"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-inner border border-blue-200 animate-fade-in-right">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <DollarSign className="text-green-600" size={24} /> Order Summary
              </h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center py-4">Your cart is empty.</p>
              ) : (
                <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.productId}
                      className={`flex justify-between items-center py-3 ${index < cartItems.length - 1 ? 'border-b border-gray-200' : ''} animate-slide-in-item`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md shadow-sm" />
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">₹ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-gray-900">Total:</h3>
                <p className="text-3xl font-extrabold text-green-700">₹ {total.toFixed(2)}</p>
              </div>

              <button
                onClick={handlePlaceOrder}
                // Changed button color to bg-slate-900, adjusted hover
                className="mt-8 w-full bg-slate-900 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-slate-700 animate-pulse-on-hover"
              >
                <CheckCircle size={20} /> Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Custom CSS Animations --- */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }

        @keyframes slide-in-top {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-top {
          animation: slide-in-top 0.7s ease-out forwards;
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        @keyframes slide-in-item {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-slide-in-item {
            animation: slide-in-item 0.4s ease-out forwards;
        }

        @keyframes pulse-on-hover {
            0% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); }
            50% { transform: scale(1.02); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); }
            100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); }
        }
        .animate-pulse-on-hover:hover {
            animation: pulse-on-hover 0.5s ease-in-out forwards;
        }


        /* Custom Scrollbar for Order Summary */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f0f4f8; /* Light gray track */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; /* Gray thumb */
          border-radius: 10px;
          border: 2px solid #f0f4f8; /* Padding around thumb */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8; /* Darker gray on hover */
        }
      `}</style>
    </div>
  );
}