import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const liked = isInWishlist(product.id);

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const toggleWishlist = () => {
    liked ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <div className="relative bg-white shadow-md rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* ❤️ Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        {liked ? (
          <span className="text-red-500 text-xl">❤️</span>
        ) : (
          <span className="text-gray-400 text-xl">🤍</span>
        )}
      </button>

      {/* 🖼️ Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
        onClick={handleViewDetails}
      />

      {/* 📦 Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mb-4">₹ {product.price}</p>

        <button
          onClick={handleViewDetails}
          className="bg-gray-900 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
