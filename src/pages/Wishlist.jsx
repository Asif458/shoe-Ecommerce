import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">₹ {product.price}</p>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <button
                    onClick={() => moveToCart(product)}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    View
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.productId)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
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
