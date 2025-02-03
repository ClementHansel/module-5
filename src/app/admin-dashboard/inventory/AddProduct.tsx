import React, { useState } from "react";

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [image, setImage] = useState("https://placeimg.com/640/480/any");

  const handleAddProduct = async () => {
    const productData = {
      title,
      price,
      description,
      categoryId,
      images: [image],
    };

    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      console.log("Product added successfully:", data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="inventory">
      <h1>Add Product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <div>
          <label htmlFor="Title">Title:</label>
          <input
            placeholder="Insert a title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Price">Price:</label>
          <input
            placeholder="Insert Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <textarea
            placeholder="Insert Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="Category ID">Category ID:</label>
          <input
            placeholder="Insert Category ID"
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="Image URL">Image URL:</label>
          <input
            placeholder="Insert Image URL"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
