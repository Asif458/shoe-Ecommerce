import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Men",
      image: "/newmen.jpg",
    },
    {
      name: "Women",
      image: "/woman.jpg",
    },
  ];

  
  return (
    <div className="bg-gray-50">
      {/* ✅ Full-Width Hero Video Section */}
      <div className="relative w-full h-[250px] sm:h-[450px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* 🔁 Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/vid3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 🔲 Overlay Content */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 text-center">
          <div className="text-white z-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Step into Style with <span className="text-blue-300">ShoeVerse</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
              Discover premium shoes for Men and Women. Trendy, affordable, and durable.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  className="mt-2 px-5 py-2 bg-indigo-100 text-indigo-700 border border-indigo-400 rounded-full hover:bg-indigo-200 transition"
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
