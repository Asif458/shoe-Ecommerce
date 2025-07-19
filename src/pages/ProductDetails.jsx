import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { addToCart } from "../services/cartService";
import { toast } from "react-hot-toast"; // ✅ hot-toast import
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ShoppingCart, ArrowLeft, Ruler } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { wishlistItems, addToWishlist } = useContext(WishlistContext);
  const { refreshCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
      toast.error("Failed to load product.");
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast("Please select a shoe size.", { icon: "👟", style: { background: "#fff3cd", color: "#856404" } });
      return;
    }
    if (!user) {
      toast("Please login to add to cart.", { icon: "🔐" });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    try {
      await addToCart(user.id, product.id, selectedSize);
      refreshCart();
      toast.success("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleWishlistClick = async () => {
    if (!user) {
      toast("Please login to add to wishlist.", { icon: "🔐" });
      return navigate("/login");
    }
    if (isInWishlist) return toast("Already in wishlist.", { icon: "❤️" });
    try {
      await addToWishlist(product);
      toast.success("Added to wishlist!");
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Failed to add to wishlist.");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden md:grid md:grid-cols-2 gap-12 p-8 lg:p-12 animate-fade-in-up">
        {/* Product Image */}
        <div className="relative group flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-inner">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-lg transform group-hover:scale-105 transition duration-700 ease-in-out"
          />
          <button
            onClick={handleWishlistClick}
            className="absolute top-6 right-6 text-4xl p-3 rounded-full bg-white shadow-lg hover:scale-115 transition-all duration-300 transform ring-2 ring-gray-100 focus:outline-none focus:ring-blue-300"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? (
              <AiFillHeart className="text-red-500" />
            ) : (
              <AiOutlineHeart className="text-gray-400 hover:text-red-500" />
            )}
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between py-6">
          <div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h2>
            <p className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ₹ {product.price}
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-8">
              <label className="font-bold text-gray-800 flex items-center gap-3 mb-4 text-xl">
                <Ruler size={24} className="text-blue-500" /> Select Size:
              </label>
              <div className="flex gap-4 flex-wrap">
                {["6", "7", "8", "9", "10", "11"].map((size) => (
                  <button
                    key={size}
                    className={`px-6 py-3 border-2 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out shadow-md
                      ${
                        selectedSize === size
                          ? "bg-blue-600 text-white border-blue-600 transform scale-105"
                          : "bg-white text-gray-800 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:underline text-base font-medium"
            >
              <ArrowLeft size={18} /> Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
