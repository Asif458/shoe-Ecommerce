import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const stored = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // For logout link handling
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold hover:text-gray-300">
            ShoeVerse
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
          {stored && (
            <>
              <Link to="/cart" className="hover:text-gray-300">
                Cart
              </Link>
              <Link to="/wishlist" className="hover:text-gray-300">
                Wishlist
              </Link>
              <Link to="/orders" className="hover:text-gray-300">
                Orders
              </Link>
            </>
          )}
          {stored && stored.id && (
            <Link to="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {!stored ? (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
