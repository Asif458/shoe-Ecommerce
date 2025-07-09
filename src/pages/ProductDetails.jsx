import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { addToCart } from "../services/cartService";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

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
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a shoe size.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    await addToCart(user.id, product.id, selectedSize);
    alert("Added to cart!");
    navigate("/cart");
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[400px] object-cover rounded-lg shadow"
      />
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
                    ? "bg-blue-600 text-white border-blue-600"
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
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
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
