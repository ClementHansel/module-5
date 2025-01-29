import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// ✅ Mock Cart Context with Jest
const mockAddToCart = jest.fn();
jest.mock("@/context/CartContext", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  images: ["https://via.placeholder.com/150"],
};

describe("ProductCard Component", () => {
  it("renders product title and price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product").textContent).toMatch(
      /Test Product/
    );
    expect(screen.getByText("$99.99").textContent).toMatch(/\$99.99/);
  });

  it("adds product to cart when cart button is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    // ✅ Find button using aria-label if it's an icon button
    const cartButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(cartButton);

    // ✅ Ensure the function is actually called
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
