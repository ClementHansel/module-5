import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ Import to fix toBeInTheDocument()
import { describe, it, expect } from "@jest/globals";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

// ✅ Use Jest's built-in mock
jest.mock("@/context/CartContext", () => ({
  useCart: () => ({
    addToCart: jest.fn(),
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

    // ✅ Now Jest should recognize toBeInTheDocument()
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("adds product to cart when cart button is clicked", () => {
    const { addToCart } = useCart();
    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("toggles favorite when heart button is clicked", () => {
    render(<ProductCard product={mockProduct} />);
    const heartButton = screen.getByRole("button", { name: /favorite/i });

    fireEvent.click(heartButton);
    expect(localStorage.getItem("favourites")).toContain(
      mockProduct.id.toString()
    );
  });
});
