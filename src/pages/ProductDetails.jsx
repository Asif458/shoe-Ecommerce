 
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { addToCart } from "../services/cartService";
import { toast } from "react-toastify";
import { WishlistContext } from "../context/WishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const { wishlistItems, addToWishlist } = useContext(WishlistContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const isInWishlist = wishlistItems.some(
    (item) => item.id === product?.id
  );

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
      toast.warning("Please select a shoe size.");
      return;
    }

    if (!user) {
      toast.info("Please login to add to cart.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    try {
      await addToCart(user.id, product.id, selectedSize);
      toast.success("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleWishlistClick = async () => {
    if (!user) {
      toast.info("Please login to add to wishlist.");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      toast.info("Already in wishlist.");
      return;
    }

    try {
      await addToWishlist(product);
      toast.success("Added to wishlist!");
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Failed to add to wishlist.");
    }
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />
        {/* ❤️ Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 text-2xl"
        >
          {isInWishlist ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart className="text-gray-500 hover:text-red-500" />
          )}
        </button>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-lg text-gray-500 mt-2 mb-4">₹ {product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Size Selector */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700 block mb-1">
            Select Size:
          </label>
          <div className="flex gap-2 flex-wrap">
            {["6", "7", "8", "9", "10", "11"].map((size) => (
              <button
                key={size}
                className={`border rounded px-3 py-1 text-sm ${
                  selectedSize === size
                    ? "bg-gray-600 text-white border-gray-600"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-700 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={() => navigate(-1)}
          className="ml-4 text-gray-500 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

