import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const productId = product?.id;
  const liked = isInWishlist(productId);

  const handleViewDetails = () => {
    navigate(`/products/${productId}`);
  };

  const toggleWishlist = () => {
    if (!productId) return;
    liked ? removeFromWishlist(productId) : addToWishlist(product);
  };

  return (
    <div className="relative bg-white shadow-md rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* ❤️ Wishlist Toggle */}
      <button
        onClick={toggleWishlist}
        title={liked ? "Remove from Wishlist" : "Add to Wishlist"}
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <span className={`text-xl ${liked ? "text-red-500" : "text-gray-400"}`}>
          {liked ? "❤️" : "🤍"}
        </span>
      </button>

      {/* 🖼️ Product Image */}
      <img
        src={product.image}
        alt={product.name}
        onClick={handleViewDetails}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
      />

      {/* 📦 Product Info */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
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
