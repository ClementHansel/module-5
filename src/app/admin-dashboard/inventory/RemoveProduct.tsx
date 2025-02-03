import React, { useState } from "react";

const DeleteProduct: React.FC = () => {
  const [productId, setProductId] = useState("");

  const handleDeleteProduct = async () => {
    if (!productId) {
      alert("Please enter a product ID.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      console.log("Product deleted successfully");
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="inventory">
      <h1>Delete Product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDeleteProduct();
        }}
      >
        <div>
          <label htmlFor="Product ID">Product ID:</label>
          <input
            placeholder="Product ID"
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default DeleteProduct;
