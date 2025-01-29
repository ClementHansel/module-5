"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

export default function PurchasedPage() {
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
    setPurchasedProducts(purchased);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Purchased Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {purchasedProducts.length > 0 ? (
          purchasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No purchases yet.</p>
        )}
      </div>
    </div>
  );
}
