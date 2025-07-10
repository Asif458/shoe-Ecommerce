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

  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const items = res.data.wishlist || [];

      const productRequests = items.map((item) =>
        api.get(`/products/${item.productId}`)
      );
      const responses = await Promise.all(productRequests);

      const fullWishlist = responses.map((res, i) => ({
        ...res.data,
        productId: items[i].productId,
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

    const res = await api.get(`/users/${user.id}`);
    const existingWishlist = res.data.wishlist || [];

    const alreadyInWishlist = existingWishlist.some(
      (item) => item.productId === product.id
    );
    if (alreadyInWishlist) return;

    const updatedWishlist = [...existingWishlist, { productId: product.id }];
    await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    fetchWishlist();
  };

  const removeFromWishlist = async (productId) => {
    const res = await api.get(`/users/${user.id}`);
    const updatedWishlist = res.data.wishlist.filter(
      (item) => item.productId !== productId
    );
    await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    fetchWishlist();
  };

  const moveToCart = async (product) => {
    const res = await api.get(`/users/${user.id}`);
    const userData = res.data;

    const existingCart = userData.cart || [];

    const cartItem = existingCart.find(
      (item) => item.productId === product.productId
    );

    const updatedCart = cartItem
      ? existingCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...existingCart, { productId: product.productId, quantity: 1, size: "9" }];

    const updatedWishlist = userData.wishlist.filter(
      (item) => item.productId !== product.productId
    );

    await api.patch(`/users/${user.id}`, {
      cart: updatedCart,
      wishlist: updatedWishlist,
    });

    fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
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
