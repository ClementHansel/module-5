"use client"; // Because we use hooks for auth check

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardSidebar from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      router.push("/login"); // Redirect if not logged in
    }
  }, [router]);

  if (!isLoggedIn) return null; // Prevent flash of unauthorized content

  return (
    <div className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
      {/* Flexbox container to allow main content and sidebar to sit side by side */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <DashboardSidebar className="w-64" />

        {/* Main content - this will be scrollable */}
        <main className="flex-grow overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
