import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard"; // Assuming ProductCard is well-designed
import { useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from 'lucide-react'; // Import Lucide icon for search

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // State for loading/shimmer
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      setLoading(true); // Start loading
      await fetchProducts();
      setLoading(false); // End loading
    };
    fetchAndSetProducts();
    // eslint-disable-next-line
  }, [location.search, search]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      const params = new URLSearchParams(location.search);
      const category = params.get("category");

      let filtered = res.data;

      if (category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      }

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

  // --- Shimmer Loader Component ---
  const ShimmerLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => ( // Show 8 shimmer cards
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-60 bg-gray-200"></div> {/* Image placeholder */}
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div> {/* Title placeholder */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div> {/* Price placeholder */}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            {currentCategory ? (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {currentCategory} Collection
              </span>
            ) : (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                Explore Our Collection
              </span>
            )}
          </h1>
           
           
        </div>

        {/* Search & Filters */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-slide-in-up">
          {/* Search Box */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search shoes by name..."
              className="w-full pl-12 pr-5 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm transition-all duration-300 text-gray-800"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {["All", "Men", "Women"].map((cat) => {
              const isActive =
                (!currentCategory && cat === "All") || currentCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() =>
                    navigate(cat === "All" ? "/products" : `/products?category=${cat}`)
                  }
                  className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-75 ${
                    isActive
                      ? "bg-gray-900 text-white border-2 border-gray-900 shadow-md focus:ring-gray-300"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 focus:ring-blue-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products or Shimmer/No products message */}
        {loading ? (
          <ShimmerLoader />
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-inner animate-fade-in">
            <p className="text-2xl text-gray-600 font-medium mb-4">No products found matching your criteria.</p>
            <p className="text-lg text-gray-500">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="transform hover:scale-105 transition duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 100}ms` }}  
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {!loading && products.length > 0 && (
          <div className="text-center mt-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg border border-gray-200">
              <span className="text-gray-600 text-lg">Showing</span>
              <span className="font-extrabold text-gray-900 text-2xl">{products.length}</span>
              <span className="text-gray-600 text-lg">
                {products.length === 1 ? "product" : "products"}
              </span>
              {currentCategory && (
                <span className="text-gray-600 text-lg">in <span className="font-semibold text-blue-700">{currentCategory}</span></span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- Custom CSS Animations --- */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.7s ease-out forwards;
        }

        @keyframes fade-in {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}