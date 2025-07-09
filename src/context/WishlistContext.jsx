import { createContext,  useEffect, useState } from "react";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchWishlistCount();
    // eslint-disable-next-line
  }, []);

  const fetchWishlistCount = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      setWishlistCount(res.data.wishlist?.length || 0);
    } catch (err) {
      console.error("Error loading wishlist count:", err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistCount, setWishlistCount, fetchWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}
