import React, { useState } from "react";
import "./DashboardInventory.css";

const EditProduct: React.FC = () => {
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const handleEditProduct = async () => {
    if (!productId || (!title && price === "")) {
      alert("Please enter product ID and at least one field to update.");
      return;
    }

    const updatedData: { title?: string; price?: number } = {};
    if (title) updatedData.title = title;
    if (price !== "") updatedData.price = Number(price);

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();
      console.log("Product updated successfully:", data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="inventory">
      <h1>Edit Product</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleEditProduct();
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
        <div>
          <label htmlFor="Title">Title:</label>
          <input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Price">Price:</label>
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <input
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
