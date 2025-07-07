import api from "./api";

/**
 * Adds a product to the cart with quantity + size.
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product.
 * @param {string} size - The selected shoe size.
 */
export async function addToCart(userId, productId, size) {
  try {
    // Get user data
    const res = await api.get(`/users/${userId}`);
    const user = res.data;

    // Check if product+size is already in cart
    const existingItem = user.cart.find(
      (item) => item.productId === productId && item.size === size
    );

    let updatedCart;
    if (existingItem) {
      // Increment quantity for this product+size
      updatedCart = user.cart.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new product with size
      updatedCart = [
        ...user.cart,
        { productId, quantity: 1, size }
      ];
    }

    // Update user cart in db.json
    await api.patch(`/users/${userId}`, { cart: updatedCart });

    return true;
  } catch (err) {
    console.error("Error adding to cart:", err);
    throw err;
  }
}
