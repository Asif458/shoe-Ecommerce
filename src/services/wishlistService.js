import api from "./api";

// Add to wishlist
export async function addToWishlist(userId, productId) {
  const res = await api.get(`/users/${userId}`);
  const user = res.data;

  if (user.wishlist.some((item) => item.productId === productId)) return;

  const updatedWishlist = [...user.wishlist, { productId }];
  await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });
}

// Remove from wishlist
export async function removeFromWishlist(userId, productId) {
  const res = await api.get(`/users/${userId}`);
  const user = res.data;

  const updatedWishlist = user.wishlist.filter((item) => item.productId !== productId);
  await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });
}
