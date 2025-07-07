import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch cart on mount
  useEffect(() => {
    if (user) fetchCart();
    else setLoading(false);
    // eslint-disable-next-line
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      const cart = res.data.cart || [];

      const productRequests = cart.map((item) =>
        api.get(`/products/${item.productId}`)
      );
      const productsResponses = await Promise.all(productRequests);

      const items = productsResponses.map((response, index) => ({
        ...response.data,
        quantity: cart[index].quantity,
      }));

      setCartItems(items);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = () => fetchCart();

  return (
    <CartContext.Provider value={{ cartItems, loading, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
