"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

export default function FavouritePage() {
  const [favouriteProducts, setFavouriteProducts] = useState([]);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavouriteProducts(
      Array.isArray(storedFavourites) ? storedFavourites : []
    );
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Favourite Products</h1>
      {favouriteProducts.length === 0 ? (
        <p>No favourite products yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {favouriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
