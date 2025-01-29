"use client";
import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, completePurchase, clearCart } = useCart();
  const [notification, setNotification] = useState("");
  const searchParams = useSearchParams();

  const selectedItemIds = searchParams.get("selectedItems")
    ? JSON.parse(searchParams.get("selectedItems")!)
    : [];

  // Use useMemo instead of useEffect to avoid infinite re-render loop
  const itemsToPurchase = useMemo(() => {
    return selectedItemIds.length > 0
      ? cart.filter((item) => selectedItemIds.includes(item.id))
      : cart;
  }, [cart, selectedItemIds]);

  const total = itemsToPurchase.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCompletePurchase = () => {
    if (itemsToPurchase.length === 0) {
      toast.error("⚠️ No items selected for purchase.");
      return;
    }

    completePurchase(itemsToPurchase);
    clearCart(selectedItemIds);
    toast.success("✅ Purchase completed successfully!");

    setTimeout(() => {
      router.push("/purchased");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {notification && (
        <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
          {notification}
        </div>
      )}

      {itemsToPurchase.length === 0 ? (
        <p className="text-gray-600">No items selected for purchase.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {itemsToPurchase.map((product) => (
            <div
              key={product.id}
              className="border-b py-4 flex items-center gap-4"
            >
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
            </div>
          ))}
          <div className="text-xl font-bold mt-4">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={handleCompletePurchase}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mt-6 w-full"
          >
            Complete Purchase
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded mt-2 w-full"
          >
            Back to Cart
          </button>
        </div>
      )}
    </div>
  );
}
