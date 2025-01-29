"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface PaginationProps {
  items: any[];
  title: string;
  onAddToCart: (product: any) => void;
}

export default function PaginationComponent({
  items = [],
  title,
  onAddToCart,
}: PaginationProps) {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil((items.length || 0) / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <nav className="text-gray-700 text-sm mb-4">
        <a href="/" className="hover:underline">
          Home
        </a>{" "}
        /<span className="font-semibold">{title}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {/* Product Grid */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
