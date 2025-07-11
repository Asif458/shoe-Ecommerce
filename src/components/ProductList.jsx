import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [location.search, search]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      const params = new URLSearchParams(location.search);
      const category = params.get("category");

      let filtered = res.data;

      // Filter by category
      if (category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Filter by search
      if (search.trim()) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const currentCategory = new URLSearchParams(location.search).get("category");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        {currentCategory
          ? `Shop ${currentCategory} Shoes`
          : "Shop All Shoes"}
      </h1>

      {/* 🔍 Search & Filter */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search shoes by name..."
          className="w-full md:w-1/2 px-5 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-50"
        />

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["All", "Men", "Women"].map((cat) => {
            const isActive =
              (!currentCategory && cat === "All") || currentCategory === cat;

            return (
              <button
                key={cat}
                onClick={() =>
                  navigate(cat === "All" ? "/products" : `/products?category=${cat}`)
                }
                className={`px-4 py-2 text-sm rounded-full font-medium transition border ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🛒 Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
