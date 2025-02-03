"use client";

import React, { useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./RemoveProduct";
import "./DashboardInventory.css";
import ProductPage from "@/app/products/page";

const DashboardInventory = () => {
  const [activeTab, setActiveTab] = useState<string>("list"); // State to manage the active tab

  return (
    <div className="p-8">
      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("list")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Product List
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Add Product
        </button>
        <button
          onClick={() => setActiveTab("edit")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit Product
        </button>
        <button
          onClick={() => setActiveTab("remove")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Remove Product
        </button>
      </div>

      {/* Conditional Content Rendering Based on Active Tab */}
      <div className="content">
        {activeTab === "list" && (
          <div className="product-list">
            <h2 className="text-2xl font-semibold mb-4">Product List</h2>
            <ProductPage />
          </div>
        )}

        {activeTab === "add" && (
          <div className="add-product">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <AddProduct />
          </div>
        )}

        {activeTab === "edit" && (
          <div className="edit-product">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <EditProduct />
          </div>
        )}

        {activeTab === "remove" && (
          <div className="remove-product">
            <h2 className="text-2xl font-semibold mb-4">Remove Product</h2>
            <DeleteProduct />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardInventory;
