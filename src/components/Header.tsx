"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (currentUser) {
      setIsLoggedIn(true);
      setUsername(currentUser.username);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUsername("");
    setShowPanel(false);

    router.push("/"); // Redirect to homepage
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const togglePanel = () => {
    setShowPanel((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target.closest(".user-panel")) {
        setShowPanel(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <a href="/">
          <h1 className="text-xl font-bold">E-Commerce</h1>
        </a>
      </div>
      <nav className="flex items-center gap-6">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/cart">Cart</a>
      </nav>
      {isLoggedIn ? (
        <div className="relative user-panel">
          <button onClick={togglePanel} className="focus:outline-none">
            {username}
          </button>
          {showPanel && (
            <div className="absolute right-0 bg-white text-black rounded shadow-lg mt-2 w-40">
              <a
                href="/favourite"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Favourites
              </a>
              <a
                href="/purchased"
                className="block px-4 py-2 hover:bg-gray-100 border-b"
              >
                Purchased
              </a>
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <a href="/auth">
          <button className="bg-blue-500 px-4 py-2 rounded">Sign In</button>
        </a>
      )}
    </header>
  );
}
