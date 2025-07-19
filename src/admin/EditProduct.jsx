import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";  

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to fetch product:", err);
      toast.error("Error fetching product"); //  
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, product);
      toast.success("Product updated successfully!");  
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to update:", err);
      toast.error("Update failed"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
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
            <label className="block font-medium mb-1">Price</label>
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
