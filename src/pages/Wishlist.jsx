import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import {
  Heart,
  ShoppingCart,
  Eye,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast"; // ✅ Add toast import

export default function Wishlist() {
  const navigate = useNavigate();
  const {
    wishlistItems,
    refreshWishlist,
    removeFromWishlist,
    moveToCart,
  } = useContext(WishlistContext);

  useEffect(() => {
    refreshWishlist();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (wishlistItems.length === 0) {
      toast("Your wishlist is empty. Start adding some favorites!");
    }
  }, [wishlistItems]);

  // ✅ Wrapper to show toast after remove
  const handleRemove = (id) => {
    removeFromWishlist(id);
    toast.success("Removed from wishlist");
  };

  // ✅ Wrapper to show toast after move
  const handleMoveToCart = (product) => {
    moveToCart(product);
    toast.success("Moved to cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10 text-center w-full flex items-center justify-center gap-4">
        <Heart size={48} className="text-red-500 animate-pulse-heart" />
        Your Wishlist
      </h1>

      {/* Empty Wishlist State */}
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center animate-fade-in">
          <Heart size={64} className="text-red-300 mb-6" />
          <p className="text-xl text-gray-600 font-medium mb-6">
            Your wishlist is empty. Start adding some favorites!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-7 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            <ArrowLeft size={20} /> Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl w-full">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="relative bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl group animate-fade-in-up"
            >
              {/* Product Image */}
              <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                />
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                  {product.name}
                </h2>
                <p className="text-lg font-semibold text-teal-600 mb-4">
                  ₹ {product.price}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto space-y-3">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-full font-semibold text-base shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
                  >
                    <ShoppingCart size={18} /> Move to Cart
                  </button>

                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2.5 rounded-full font-semibold text-base shadow-sm hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 active:scale-95"
                  >
                    <Eye size={18} /> View Details
                  </button>

                  <button
                    onClick={() => handleRemove(product.id)}
                    className="w-full flex items-center justify-center gap-2 text-red-600 text-sm mt-3 py-1.5 hover:underline hover:text-red-800 transition-colors duration-300"
                  >
                    <Trash2 size={16} /> Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
