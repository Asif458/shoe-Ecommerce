import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      const params = new URLSearchParams(location.search);
      const category = params.get("category");

      let filtered = res.data;
      if (category) {
        filtered = res.data.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      }

      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {new URLSearchParams(location.search).get("category")
          ? `Shop ${new URLSearchParams(location.search)
              .get("category")
              .toUpperCase()} Shoes`
          : "Shop All Shoes"}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
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
