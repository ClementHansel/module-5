"use client";

import { useState, useEffect } from "react";

export default function DashboardHomePage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          const currentUser = JSON.parse(storedUser);
          setUsername(currentUser?.username || null);
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUsername(null);
      }
    };

    // Initial check
    checkUser();

    // Listen for `storage` changes from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "currentUser") {
        checkUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        {username ? `Welcome, ${username}!` : "Welcome, Guest!"}
      </h1>
      <div>
        <h2>This is widget div</h2>
      </div>
      <div>
        <h2>This is bar and pie div</h2>
      </div>
    </div>
  );
}
