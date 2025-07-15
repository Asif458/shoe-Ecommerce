import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

export default function Cart() {
  const { cartItems, changeQuantity, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Calculate total price when cart changes
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold to tobg-slate-900">
        Your Shopping Cart
      </h1>

      {/* Empty Cart State */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-sm w-full text-center">
          <ShoppingCart size={60} className="text-gray-400 mb-5 animate-fade-in" />
          <p className="text-lg text-gray-600 font-medium mb-5">
            Your cart is currently empty.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-bold text-base shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            <ChevronLeft size={18} /> Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row items-center gap-5 p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.005] animate-fade-in"
              >
                <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-0.5">
                    Size: <span className="font-semibold text-gray-800">{item.size}</span>
                  </p>
                  {/* Individual Product Price - Changed to teal */}
                  <p className="text-lg font-bold text-teal-600 mb-2">
                    ₹ {item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                    <button
                      onClick={() => changeQuantity(item.productId, "dec")}
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
                      disabled={item.quantity === 1}
                      aria-label="Decrease quantity"
                    >
                      <MinusCircle size={20} />
                    </button>
                    <span className="text-lg font-semibold text-gray-900 w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => changeQuantity(item.productId, "inc")}
                      className="text-gray-500 hover:text-green-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300"
                      aria-label="Increase quantity"
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="flex items-center justify-center sm:justify-start gap-1.5 text-red-500 text-xs mt-3 hover:text-red-700 transition-colors duration-200 hover:underline font-medium"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary / Total + Checkout */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg border border-gray-100 p-7 sticky top-20 h-fit animate-fade-in-right">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5 pb-3 border-b border-gray-200">
              Order Summary
            </h2>
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-3">
              <span>Subtotal:</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-5">
              <span>Shipping:</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-extrabold text-gray-900 pt-3 border-t-2 border-dashed border-gray-300">
              {/* Total Price - Changed to orange */}
              <span className="text-orange-500">Total:</span>
              <span className="text-orange-500">₹ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full flex items-center justify-center gap-2.5 bg-gradient-to-r bg-slate-900 bg-slate-700 hover:from-blue-700 bg-slate-900 text-white px-7 py-3.5 rounded-full font-bold text-base shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/products")}
              className="mt-3 w-full flex items-center justify-center gap-1.5 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:underline text-sm font-medium"
            >
              <ChevronLeft size={16} /> Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}