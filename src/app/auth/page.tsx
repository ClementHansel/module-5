"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setError("");
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      toast.error("❌ Invalid email or password");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    toast.success(`✅ Welcome, ${user.username}!`);
    router.push("/");
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      toast.error("⚠️ User already exists");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("🎉 Sign-up successful! You can now sign in.");
    toggleForm();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-96 bg-white shadow-lg rounded-lg p-6">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {isSignUp ? (
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full border p-2 mb-2"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-2"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-4"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Sign Up
            </button>
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <span
                onClick={toggleForm}
                className="text-blue-500 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignIn}>
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-2"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-4"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Sign In
            </button>
            <p className="mt-4 text-sm text-center">
              Don't have an account?{" "}
              <span
                onClick={toggleForm}
                className="text-blue-500 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
