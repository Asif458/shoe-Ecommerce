import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, loading } = useContext(CartContext);

  if (loading) return <p>Loading...</p>;

  if (cartItems.length === 0)
    return (
      <div className="p-4">
        <h2 className="text-xl">Your cart is empty.</h2>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border p-4 rounded shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover mr-4"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹ {item.price}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
