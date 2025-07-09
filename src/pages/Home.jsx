import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Men",
      image: "/menshoes.png",
    },
    {
      name: "Women",
      image: "/womansshoes.jpg",
    },
  ];

  return (
    
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            Step into Style with{" "}
            <span className="text-blue-600">ShoeVerse</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium shoes for Men and Women. Trendy, affordable, and durable.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{cat.name}'s Shoes</h3>
                <button
                  onClick={() => navigate(`/products?category=${cat.name}`)}
                  className="inline-block mt-2 px-5 py-2 bg-indigo-100 text-indigo-700 border border-indigo-400 rounded-full hover:bg-indigo-200 transition"
                >
                  Explore {cat.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
