"use client";
import { useState, useEffect } from "react";
import PaginationComponent from "@/components/Pagination";
import { addToCart } from "@/utils/cartUtils";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${params.id}/products`
        );
        const data = await response.json();
        setCategoryProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setCategoryProducts([]);
      }
    };

    fetchCategoryProducts();
  }, [params.id]);

  const handleAddToCart = (product: any) => {
    const success = addToCart(product);
    setNotification(success ? "✅ Added to cart!" : "⚠️ Item already in cart!");

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Notification */}
      {notification && (
        <div className="bg-green-500 text-white p-2 mb-4 text-center">
          {notification}
        </div>
      )}

      <PaginationComponent
        items={categoryProducts}
        title="Category Products"
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
