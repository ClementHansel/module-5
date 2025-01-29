"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("⚠️ Please select at least one item to checkout.");
      return;
    }

    const queryString = new URLSearchParams({
      selectedItems: JSON.stringify(selectedItems),
    }).toString();
    router.push(`/checkout?${queryString}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className="border-b py-4 flex items-center gap-4"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(product.id)}
                onChange={() => handleSelectItem(product.id)}
                className="w-5 h-5"
              />
              <img
                src={product.images?.[0] || "/placeholder-image.png"}
                alt={product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">
                  ${product.price} x {product.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4 font-bold">{product.quantity || 1}</span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    removeFromCart(product.id);
                    toast.info("🗑️ Item removed from cart");
                  }}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-6 w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
