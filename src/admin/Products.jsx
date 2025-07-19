import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";  

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, search, sortOrder]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <span className="flex flex-col">
          <p className="font-medium mb-2">Are you sure you want to delete this product?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/products/${id}`);
                  setProducts((prev) => prev.filter((p) => p.id !== id));
                  toast.success("Product deleted successfully");
                } catch (err) {
                  console.error("Failed to delete product:", err);
                  toast.error("Delete failed. Please try again.");
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  const applyFilters = () => {
    let temp = [...products];

    // Search
    if (search.trim()) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "lowToHigh") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFiltered(temp);
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by product name..."
          className="border p-2 rounded w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full sm:w-1/4"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full sm:w-auto"
        >
          + Add Product
        </button>
      </div>

      {/*  Product Table */}
      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left px-6 py-3">Image</th>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Price</th>
                <th className="text-left px-6 py-3">Category</th>
                <th className="text-left px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium">{p.name}</td>
                  <td className="px-6 py-3">₹{p.price}</td>
                  <td className="px-6 py-3">{p.category}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                      className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
