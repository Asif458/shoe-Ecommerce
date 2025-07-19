import React, { useState, useContext } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { LogIn, Mail, Lock } from "lucide-react";
import { toast } from "react-hot-toast"; // ✅ hot toast import

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/users?email=${form.email}&password=${form.password}`);
      if (res.data.length === 0) {
        toast.error("Invalid credentials");
        return;
      }

      const user = res.data[0];
      if (user.isBlock) {
        toast.error("Account is blocked");
        return;
      }

      login(user);
      toast.success(`Welcome, ${user.name}!`);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]">
        <div className="flex flex-col items-center mb-8">
          <LogIn size={64} className="text-blue-600 mb-4 animate-bounce-in" />
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-lg mt-2">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
              aria-label="Password"
            />
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
            type="submit"
          >
            <LogIn size={20} /> Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
