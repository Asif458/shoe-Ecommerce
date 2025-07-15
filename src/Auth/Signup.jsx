import React, { useState, useContext } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { UserPlus, User, Mail, Lock } from "lucide-react"; // Importing icons

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const check = await api.get(`/users?email=${form.email}`);
      if (check.data.length > 0) return alert("Email already exists");

      const newUser = {
        ...form,
        role: "user",
        isBlock: false,
        cart: [],
        wishlist: [],
        orders: [],
        created_at: new Date().toISOString(),
      };

      const res = await api.post("/users", newUser);
      login(res.data);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-100 p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]">
        <div className="flex flex-col items-center mb-8">
          <UserPlus size={64} className="text-teal-600 mb-4 animate-bounce-in" /> {/* Modern icon with animation */}
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">
            Join Us!
          </h2>
          <p className="text-gray-500 text-lg mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
              aria-label="Full Name"
            />
          </div>
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
              aria-label="Email"
            />
          </div>
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
              aria-label="Password"
            />
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-green-700 hover:from-teal-700 hover:to-green-800 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 active:scale-95"
            type="submit"
          >
            <UserPlus size={20} /> Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-teal-600 font-semibold hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300 rounded"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}