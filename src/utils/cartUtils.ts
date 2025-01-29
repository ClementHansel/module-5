export const addToCart = async (product: any) => {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product }),
  });

  if (!response.ok) {
    console.error("Failed to add to cart");
    return;
  }

  const data = await response.json();
  console.log("Cart updated:", data.cart);
};

export const addToFavorite = async (product: any) => {
  const response = await fetch("/api/favorite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product }),
  });

  if (!response.ok) {
    console.error("Failed to add to favorites");
    return;
  }

  const data = await response.json();
  console.log("Favorites updated:", data.favorites);
};
