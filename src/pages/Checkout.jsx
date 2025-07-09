import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

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
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between border-b py-2"
            >
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p>₹ {item.price * item.quantity}</p>
            </div>
          ))}
          <h3 className="text-right mt-4 font-bold">Total: ₹ {total}</h3>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
