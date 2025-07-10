import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/Authcontext";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { wishlistCount } = useContext(WishlistContext);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartCount = cartItems.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false); // close mobile menu on logout
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-900 text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold" onClick={closeMenu}>
          ShoeVerse
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>

          {user && (
            <>
              <Link to="/cart" className="hover:text-gray-300">
                Cart <span className="text-green-400">({cartCount})</span>
              </Link>
              <Link to="/wishlist" className="hover:text-gray-300">
                Wishlist <span className="text-red-400">({wishlistCount})</span>
              </Link>
              <Link to="/orders" className="hover:text-gray-300">
                Orders
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Signup
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-3 animate-slide-down">
          <Link to="/products" onClick={closeMenu} className="block">
            Products
          </Link>

          {user && (
            <>
              <Link to="/cart" onClick={closeMenu} className="block">
                Cart ({cartCount})
              </Link>
              <Link to="/wishlist" onClick={closeMenu} className="block">
                Wishlist ({wishlistCount})
              </Link>
              <Link to="/orders" onClick={closeMenu} className="block">
                Orders
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" onClick={closeMenu} className="block">
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu} className="block">
                Login
              </Link>
              <Link to="/signup" onClick={closeMenu} className="block">
                Signup
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
