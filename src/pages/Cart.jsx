import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, changeQuantity, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  //  Calculate total price when cart changes
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {/*  Empty Cart */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {/*  Cart Items */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white shadow rounded-lg flex flex-col md:flex-row gap-4 p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-36 h-36 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-800 font-medium">₹ {item.price}</p>

                  {/*  Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => changeQuantity(item.productId, "dec")}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.productId, "inc")}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/*  Remove */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total + Checkout */}
          <div className="text-right mt-8">
            <h2 className="text-xl font-bold mb-2">Total: ₹ {total}</h2>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
