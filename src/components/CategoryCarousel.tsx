"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      ).then((res) => res.json());
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleCategories = [
    categories[startIndex],
    categories[(startIndex + 1) % categories.length],
    categories[(startIndex + 2) % categories.length],
  ];

  const handleCategoryClick = (id: number) => {
    router.push(`/products/category/${id}`);
  };

  return (
    <div className="relative w-full">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full w-12 h-12 mr-4"
        >
          ←
        </button>

        {/* Carousel */}
        <div className="flex gap-4 overflow-hidden w-full">
          {visibleCategories.map(
            (category, index) =>
              category && (
                <div
                  key={index}
                  className="w-1/3 flex-shrink-0 border rounded-lg shadow p-4 text-center cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-60 w-full object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full w-12 h-12 ml-4"
        >
          →
        </button>
      </div>
    </div>
  );
}
