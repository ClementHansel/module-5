"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavorite(storedFavorites.some((fav: any) => fav.id === product.id));
  }, [product.id]);

  const handleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    let storedFavorites = JSON.parse(localStorage.getItem("favourites")) || [];

    if (isFavorite) {
      storedFavorites = storedFavorites.filter(
        (fav: any) => fav.id !== product.id
      );
      toast.info("❌ Removed from Favorites");
    } else {
      storedFavorites.push(product);
      toast.success("❤️ Added to Favorites");
    }

    localStorage.setItem("favourites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
    toast.success("🛒 Added to Cart");
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative">
        <img
          src={product.images?.[0] || "/placeholder-image.png"}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <button
          aria-label="Favorite"
          onClick={handleFavorite}
          className="absolute top-3 right-3"
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? "text-red-500" : "text-gray-400"
            } hover:text-red-600`}
          />
        </button>
      </div>
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
      <p className="text-gray-700">${product.price}</p>
      <button
        aria-label="Add to Cart"
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
    </div>
  );
}
