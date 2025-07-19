import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  MapPin,
  Phone,
  User,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast"; // ✅ Import toast

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
      toast.error("Please fill in all fields");
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
        cart: [],
      });

      refreshCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Something went wrong. Please try again.");
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
            {/* Shipping Info */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200 animate-fade-in-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MapPin className="text-blue-600" size={24} /> Shipping Details
              </h2>
              <div className="space-y-5">
                {["name", "address", "phone"].map((field, index) => {
                  const icons = {
                    name: <User />,
                    address: <MapPin />,
                    phone: <Phone />,
                  };
                  return (
                    <div key={index} className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        {icons[field]}
                      </div>
                      <input
                        type={field === "phone" ? "tel" : "text"}
                        name={field}
                        placeholder={
                          field === "name"
                            ? "Full Name"
                            : field === "address"
                            ? "Delivery Address"
                            : "Phone Number"
                        }
                        value={shippingInfo[field]}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
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
                      className={`flex justify-between items-center py-3 ${
                        index < cartItems.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      } animate-slide-in-item`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md shadow-sm"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ₹ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-gray-900">Total:</h3>
                <p className="text-3xl font-extrabold text-green-700">
                  ₹ {total.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-8 w-full bg-slate-900 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-slate-700 animate-pulse-on-hover"
              >
                <CheckCircle size={20} /> Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
