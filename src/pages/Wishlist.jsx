import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchWishlist();
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

      setWishlist(fullWishlist);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    const updated = wishlist.filter((item) => item.productId !== productId);
    setWishlist(updated);

    const updatedWishlist = updated.map((item) => ({
      productId: item.productId,
    }));

    await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
  };

  const moveToCart = async (product) => {
    const res = await api.get(`/users/${user.id}`);
    const userData = res.data;

    const cartItem = userData.cart.find(
      (item) => item.productId === product.productId
    );
    const updatedCart = cartItem
      ? userData.cart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...userData.cart, { productId: product.productId, quantity: 1 }];

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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">₹ {product.price}</p>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <button
                    onClick={() => moveToCart(product)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.productId)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
