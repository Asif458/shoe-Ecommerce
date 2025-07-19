import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    sizes: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      price: parseInt(product.price),
      stock: parseInt(product.stock),
      sizes: product.sizes.split(",").map((size) => size.trim()),
    };

    const loadingToast = toast.loading("Adding product...");

    try {
      await api.post("/products", payload);
      toast.success(" Product added successfully!", { id: loadingToast });
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to add product:", err);
      toast.error(" Failed to add product", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Sizes (comma separated)</label>
            <input
              type="text"
              name="sizes"
              value={product.sizes}
              onChange={handleChange}
              placeholder="e.g. 6, 7, 8, 9, 10, 11"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
