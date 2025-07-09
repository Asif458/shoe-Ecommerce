// ✅ CartContext.jsx (Improved with update & remove logic)
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchCart();
    else setLoading(false);
    // eslint-disable-next-line
  }, []);

  // 🔄 Fetch cart from server
  const fetchCart = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const cart = res.data.cart || [];

      const productRequests = cart.map((item) =>
        api.get(`/products/${item.productId}`)
      );
      const responses = await Promise.all(productRequests);

      const items = responses.map((res, index) => ({
        ...res.data,
        quantity: cart[index].quantity,
        size: cart[index].size,
        productId: cart[index].productId,
      }));

      setCartItems(items);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Update cart on backend
  const updateCart = async (updatedItems) => {
    try {
      const updatedCart = updatedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
      }));
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      fetchCart();
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // ➕➖ Change quantity
  const changeQuantity = (productId, type) => {
    const updated = cartItems.map((item) => {
      if (item.productId === productId) {
        const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setCartItems(updated);
    updateCart(updated);
  };

  // ❌ Remove item
  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updated);
    updateCart(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        refreshCart: fetchCart,
        changeQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
