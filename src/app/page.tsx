"use client";

import { useState, useEffect } from "react";
import CategoryCarousel from "@/components/CategoryCarousel";

export default function HomePage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );
      setUsername(currentUser ? currentUser.username : null);
    };

    checkUser();
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        {username ? `Welcome, ${username}!` : "Welcome, Guest!"}
      </h1>
      <p className="mb-6">Explore our products!</p>

      <CategoryCarousel />
    </div>
  );
}
