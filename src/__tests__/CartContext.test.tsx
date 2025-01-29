import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";
import { expect, describe, it } from "@jest/globals";

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
  selected: boolean;
}

const mockProduct: CartItem = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  images: ["https://via.placeholder.com/150"],
  quantity: 1,
  selected: false,
};

describe("Cart Context", () => {
  it("adds product to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0]).toEqual(mockProduct);
  });

  it("removes product from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cart.length).toBe(0);
  });
});
