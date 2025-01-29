"use client";

import { SessionProvider } from "next-auth/react";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-gray-100 text-gray-900 flex flex-col min-h-screen`}
      >
        <SessionProvider>
          {" "}
          <CartProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
