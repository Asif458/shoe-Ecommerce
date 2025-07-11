// ✅ WishlistContext.jsx
import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchWishlist();
    else setLoading(false);
    // eslint-disable-next-line
  }, []);

  // ✅ Fetch full wishlist
  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const wishlist = res.data.wishlist || [];

      const productRequests = wishlist.map((item) =>
        api.get(`/products/${item.productId}`)
      );
      const responses = await Promise.all(productRequests);

      const fullWishlist = responses.map((res, i) => ({
        ...res.data,
        productId: wishlist[i].productId,
      }));

      setWishlistItems(fullWishlist);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

   
  const addToWishlist = async (product) => {
    if (!user) return;

    try {
      const res = await api.get(`/users/${user.id}`);
      const wishlist = res.data.wishlist || [];

      const alreadyExists = wishlist.some(
        (item) => item.productId === product.id
      );
      if (alreadyExists) return;

      const updatedWishlist = [...wishlist, { productId: product.id }];
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      fetchWishlist();
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

 
  const removeFromWishlist = async (productId) => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const updatedWishlist = res.data.wishlist.filter(
        (item) => item.productId !== productId
      );

      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      fetchWishlist();
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

 
  const moveToCart = async (product) => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const userData = res.data;

      const wishlist = userData.wishlist || [];
      const cart = userData.cart || [];

      const alreadyInCart = cart.find(
        (item) => item.productId === product.productId
      );

      const updatedCart = alreadyInCart
        ? cart.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cart, { productId: product.productId, quantity: 1, size: "8" }]; // 👟 default size

      const updatedWishlist = wishlist.filter(
        (item) => item.productId !== product.productId
      );

      await api.patch(`/users/${user.id}`, {
        cart: updatedCart,
        wishlist: updatedWishlist,
      });

      fetchWishlist();
    } catch (err) {
      console.error("Error moving to cart:", err);
    }
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        loading,
        refreshWishlist: fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
