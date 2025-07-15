import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/Authcontext";
import {
  Menu, X, ShoppingCart, Heart, Package, Settings, User, LogOut, Lock,
  ChevronDown, ChevronUp
} from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { wishlistCount } = useContext(WishlistContext);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const cartCount = cartItems.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-slate-900 shadow-lg border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-pink-400 transition-all duration-500 transform hover:scale-110 hover:drop-shadow-lg"
          >
            ShoeVerse
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/products"
              className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-slate-800 transform hover:scale-105 hover:shadow-md relative group"
            >
              Products
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>

            {user && (
              <>
                <Link
                  to="/cart"
                  className="relative text-gray-300 hover:text-blue-400 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-slate-800 transform hover:scale-105 hover:shadow-md flex items-center gap-2 group"
                >
                  <ShoppingCart size={18} className="group-hover:animate-bounce" />
                  Cart ({cartCount})
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/wishlist"
                  className="relative text-gray-600 hover:text-pink-600 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-pink-50 transform hover:scale-105 hover:shadow-md flex items-center gap-2 group"
                >
                  <Heart size={18} className="group-hover:animate-pulse" />
                  Wishlist ({wishlistCount})
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/orders"
                  className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-slate-800 transform hover:scale-105 hover:shadow-md flex items-center gap-2 group"
                >
                  <Package size={18} className="group-hover:animate-bounce" />
                  Orders
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-slate-800 transform hover:scale-105 hover:shadow-md flex items-center gap-2 group"
              >
                <Settings size={18} className="group-hover:animate-spin" />
                Admin
              </Link>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-slate-800 transform hover:scale-105 hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 bg-slate-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-slate-700 transition-all"
                >
                  <User size={16} className="text-blue-400" />
                  <span className="font-medium">{user.name || user.email}</span>
                  {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl z-50 overflow-hidden border border-gray-200 animate-fade-in-up">
                    <button
                      onClick={() => {
                        navigate("/change-password");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 flex items-center gap-2"
                    >
                      <Lock size={16} className="text-blue-500" />
                      Change Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 flex items-center gap-2"
                    >
                      <LogOut size={16} className="text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-blue-400 p-2 rounded-xl hover:bg-slate-800 transition-all duration-300 transform hover:scale-110"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
