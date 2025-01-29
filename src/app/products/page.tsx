"use client";
import { useState, useEffect } from "react";
import PaginationComponent from "@/components/Pagination";
import { addToCart } from "@/utils/cartUtils";

export default function ProductPage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    const success = addToCart(product);
    setNotification(success ? "✅ Added to cart!" : "⚠️ Item already in cart!");

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="container mx-auto px-4">
      {notification && (
        <div className="bg-green-500 text-white p-2 mb-4 text-center">
          {notification}
        </div>
      )}

      <PaginationComponent
        items={allProducts}
        title="All Products"
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
