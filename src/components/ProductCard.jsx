import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product}) {
  return (
    <div className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">₹ {product.price}</p>
      <Link
        to={`/products/${product.id}`}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center block"
      >
        View Details
      </Link>
    </div>
  );
}
