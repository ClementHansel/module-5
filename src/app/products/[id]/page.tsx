"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${params.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || "/placeholder-image.png");

        const storedFavorites =
          JSON.parse(localStorage.getItem("favourites")) || [];
        setIsFavorite(storedFavorites.some((fav: any) => fav.id === data.id));
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (isFavorite) {
      storedFavorites = storedFavorites.filter(
        (fav: any) => fav.id !== product.id
      );
      toast.info("❌ Removed from Favorites");
    } else {
      storedFavorites.push(product);
      toast.success("❤️ Added to Favorites");
    }
    localStorage.setItem("favourites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("🛒 Added to Cart");
  };

  if (error) return <div className="container mx-auto px-4">{error}</div>;
  if (!product) return <div className="container mx-auto px-4">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
        {/* Main Image */}
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-1/2 h-auto rounded-lg shadow-lg mx-auto"
          />
          <div className="flex flex-row justify-center gap-2 mt-4">
            {product.images?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={` w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  selectedImage === img
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">
            {product.description || "No description available."}
          </p>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleFavorite}
              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                }`}
              />
              Favorite
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
